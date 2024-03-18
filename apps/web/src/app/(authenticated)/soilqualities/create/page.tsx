'use client'

import React, { useState, useEffect } from 'react'
import { Typography, Form, Input, Button, Select, Row, Col } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddSoilQualityPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [listings, setListings] = useState([])
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsFound = await Api.Listing.findManyByUserId(userId, {
          includes: ['user'],
        })
        setListings(listingsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch listings', { variant: 'error' })
      }
    }

    if (userId) {
      fetchListings()
    }
  }, [userId])

  const onFinish = async values => {
    try {
      await Api.Soilquality.createOneByListingId(values.listingId, {
        quality: values.quality,
      })
      enqueueSnackbar('Soil quality added successfully', { variant: 'success' })
      router.push('/listings')
    } catch (error) {
      enqueueSnackbar('Failed to add soil quality', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Add Soil Quality</Title>
      <Paragraph>
        Enhance your graveyard plot listing by adding information about the soil
        quality.
      </Paragraph>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="listingId"
          label="Select Listing"
          rules={[{ required: true, message: 'Please select a listing!' }]}
        >
          <Select placeholder="Select a listing" allowClear>
            {listings?.map(listing => (
              <Option key={listing.id} value={listing.id}>
                {listing.description || `ID: ${listing.id}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="quality"
          label="Soil Quality"
          rules={[
            { required: true, message: 'Please input the soil quality!' },
          ]}
        >
          <Input placeholder="Enter soil quality" />
        </Form.Item>
        <Row justify="end">
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusCircleOutlined />}
            >
              Add Soil Quality
            </Button>
          </Col>
        </Row>
      </Form>
    </PageLayout>
  )
}
