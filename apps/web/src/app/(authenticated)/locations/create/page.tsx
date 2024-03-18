'use client'

import React, { useState } from 'react'
import { Button, Form, Input, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddLocationPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const handleSubmit = async (values: any) => {
    try {
      const { name, address, listingId } = values
      await Api.Location.createOneByListingId(listingId, { name, address })
      enqueueSnackbar('Location added successfully', { variant: 'success' })
      router.push('/listings')
    } catch (error) {
      enqueueSnackbar('Failed to add location', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Add New Location</Title>
      <Paragraph>
        Use the form below to add a new location for your graveyard plot
        listings.
      </Paragraph>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Listing ID"
          name="listingId"
          rules={[{ required: true, message: 'Please input the listing ID!' }]}
        >
          <Input placeholder="Enter the listing ID" />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input the location name!' },
          ]}
        >
          <Input placeholder="Enter the location name" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input placeholder="Enter the address" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusCircleOutlined />}
          >
            Add Location
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
