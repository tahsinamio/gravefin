import { User } from '../user'

import { Location } from '../location'

import { Soilquality } from '../soilquality'

export class Listing {
  id: string

  imageUrl?: string

  price?: number

  legroom?: string

  description?: string

  dateCreated: string

  dateUpdated: string

  dateDeleted: string

  userId: string

  user?: User

  locations?: Location[]

  soilqualitys?: Soilquality[]
}
