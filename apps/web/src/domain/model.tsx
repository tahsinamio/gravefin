import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Listing as ListingModel } from './listing/listing.model'

import { Location as LocationModel } from './location/location.model'

import { Soilquality as SoilqualityModel } from './soilquality/soilquality.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Listing extends ListingModel {}

  export class Location extends LocationModel {}

  export class Soilquality extends SoilqualityModel {}
}
