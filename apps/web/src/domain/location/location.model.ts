import { Listing } from '../listing'

export class Location {
  id: string

  name?: string

  address?: string

  dateCreated: string

  dateUpdated: string

  dateDeleted: string

  listingId: string

  listing?: Listing
}
