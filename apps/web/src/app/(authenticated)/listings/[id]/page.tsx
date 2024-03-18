'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Image, Tag, Divider } from 'antd'
import {
  EnvironmentOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  ProfileOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ListingDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const [listing, setListing] = useState<Model.Listing | null>(null)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingDetails = await Api.Listing.findOne(params.id, {
          includes: ['user', 'locations', 'soilqualitys'],
        })
        setListing(listingDetails)
      } catch (error) {
        enqueueSnackbar('Failed to fetch listing details.', {
          variant: 'error',
        })
      }
    }

    fetchListing()
  }, [params.id])

  return (
    <PageLayout layout="narrow">
      {listing ? (
        <>
          <Title level={2}>Graveyard Plot Details</Title>
          <Paragraph>
            This page provides a detailed view of the selected graveyard plot
            listing.
          </Paragraph>
          <Divider />
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Image
                src={listing.imageUrl}
                alt="Graveyard Plot"
                fallback="https://via.placeholder.com/200"
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12}>
              <Title level={4}>
                <DollarOutlined /> Price
              </Title>
              <Text>${listing.price}</Text>
              <Divider />
              <Title level={4}>
                <EnvironmentOutlined /> Location
              </Title>
              <Text>{listing.locations?.[0]?.name}</Text>
              <Divider />
              <Title level={4}>
                <FieldTimeOutlined /> Legroom
              </Title>
              <Text>{listing.legroom}</Text>
              <Divider />
              <Title level={4}>
                <ProfileOutlined /> Soil Quality
              </Title>
              <Tag color="green">{listing.soilqualitys?.[0]?.quality}</Tag>
              <Divider />
              <Title level={4}>Description</Title>
              <Paragraph>{listing.description}</Paragraph>
            </Col>
          </Row>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </PageLayout>
  )
}
