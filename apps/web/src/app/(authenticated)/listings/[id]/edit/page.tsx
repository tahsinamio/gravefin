'use client'

import { useEffect, useState } from 'react'
import { Button, Form, Input, Upload, Typography, Col, Row, Select } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EditListingPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()
  const [listing, setListing] = useState<any>(null)
  const [fileList, setFileList] = useState<any[]>([])

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingsFound = await Api.Listing.findManyByUserId(userId, {
          includes: ['user', 'locations', 'soilqualitys'],
        })
        const currentListing = listingsFound.find(
          listing => listing.id === params.id,
        )
        if (currentListing) {
          setListing(currentListing)
          form.setFieldsValue({
            ...currentListing,
            dateCreated: dayjs(currentListing.dateCreated).format('YYYY-MM-DD'),
            dateUpdated: dayjs(currentListing.dateUpdated).format('YYYY-MM-DD'),
          })
          if (currentListing.imageUrl) {
            setFileList([
              { url: currentListing.imageUrl, status: 'done', name: 'Image' },
            ])
          }
        }
      } catch (error) {
        enqueueSnackbar('Failed to fetch listing details', { variant: 'error' })
      }
    }
    fetchListing()
  }, [userId, params.id, form])

  const handleUpload = async options => {
    const { file } = options
    try {
      const url = await Api.Upload.upload(file)
      setFileList([{ url: url, status: 'done', name: file.name }])
      form.setFieldsValue({ imageUrl: url })
    } catch (error) {
      enqueueSnackbar('Failed to upload image', { variant: 'error' })
    }
  }

  const onFinish = async values => {
    try {
      await Api.Listing.updateOne(params.id, { ...values, userId })
      enqueueSnackbar('Listing updated successfully', { variant: 'success' })
      router.push(`/listings/${params.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to update listing', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title>Edit Graveyard Plot Listing</Title>
      <Text>Edit the details of your graveyard plot listing below.</Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={listing}
      >
        <Form.Item name="imageUrl" label="Image URL" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="Listing Image">
          <Upload
            fileList={fileList}
            customRequest={handleUpload}
            maxCount={1}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="legroom"
          label="Legroom"
          rules={[{ required: true, message: 'Please input the legroom!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dateCreated"
              label="Date Created"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dateUpdated"
              label="Date Updated"
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Listing
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
