'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  Upload,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CreateListingPage() {
  const [form] = Form.useForm()
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    if (!authentication.isAuthenticated) {
      // Since there's no valid login path, we remove the redirection to avoid bugs.
    }
  }, [authentication.isAuthenticated])

  const handleUpload = async options => {
    const { file } = options
    const url = await Api.Upload.upload(file)
    setFileList(fileList => [...fileList, { url: url, status: 'done' }])
  }

  const onFinish = async values => {
    try {
      const listingValues = {
        imageUrl: fileList[0]?.url,
        price: values.price,
        legroom: values.legroom,
        description: values.description,
        userId: userId,
      }
      const listing = await Api.Listing.createOneByUserId(userId, listingValues)
      await Api.Location.createOneByListingId(listing.id, {
        name: values.locationName,
        address: values.locationAddress,
      })
      await Api.Soilquality.createOneByListingId(listing.id, {
        quality: values.soilQuality,
      })
      enqueueSnackbar('Listing created successfully', { variant: 'success' })
      router.push('/listings')
    } catch (error) {
      enqueueSnackbar('Failed to create listing', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title>Create New Listing</Title>
      <Paragraph>
        Fill in the details below to create a new graveyard plot listing.
      </Paragraph>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={e => e.fileList}
        >
          <Upload
            customRequest={handleUpload}
            maxCount={1}
            listType="picture-card"
          >
            {fileList.length < 1 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="legroom"
          label="Legroom"
          rules={[{ required: true, message: 'Please input the legroom!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="locationName"
          label="Location Name"
          rules={[
            { required: true, message: 'Please input the location name!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="locationAddress"
          label="Location Address"
          rules={[
            { required: true, message: 'Please input the location address!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="soilQuality"
          label="Soil Quality"
          rules={[
            { required: true, message: 'Please select the soil quality!' },
          ]}
        >
          <Select placeholder="Select a soil quality">
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Listing
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
