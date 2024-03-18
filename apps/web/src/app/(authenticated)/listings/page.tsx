'use client'

import { HeartOutlined } from '@ant-design/icons'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { Card, Col, Image, Row, Typography } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography

export default function BrowseListingsPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsFound = await Api.Listing.findMany({
          includes: ['user', 'locations', 'soilqualitys'],
        })
        setListings(listingsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch listings', { variant: 'error' })
      }
    }

    fetchListings()
  }, [])

  const handleCardClick = listingId => {
    router.push(`/listings/${listingId}`)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Graveyard Plot Listings</Title>
      <Text>
        Explore our curated list of graveyard plots. Find your final resting
        place with ease.
      </Text>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {listings?.map(listing => (
          <Col xs={24} sm={12} md={8} lg={12} key={listing.id}>
            <Card
              hoverable
              onClick={() => handleCardClick(listing.id)}
              cover={
                <Image
                  alt="plot image"
                  src={listing.imageUrl || ''}
                  fallback="https://via.placeholder.com/150"
                />
              }
              actions={[
                <HeartOutlined
                  key="like"
                  onClick={e => {
                    e.stopPropagation() // Prevent card click event
                    enqueueSnackbar('Added to favorites', {
                      variant: 'success',
                    })
                  }}
                />,
              ]}
            >
              <Card.Meta
                title={`${listing.locations?.[0]?.name || 'Unknown Location'} - $${listing.price}`}
                description={
                  <>
                    <Text>Legroom: {listing.legroom}</Text>
                    <br />
                    <Text>
                      Soil Quality:{' '}
                      {listing.soilqualitys?.[0]?.quality || 'Unknown'}
                    </Text>
                    <br />
                    <Text>{listing.description}</Text>
                    <br />
                    <Text>
                      Posted: {dayjs(listing.dateCreated).format('DD/MM/YYYY')}
                    </Text>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
