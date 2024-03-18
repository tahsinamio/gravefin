import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { ListingApi } from './listing/listing.api'

import { LocationApi } from './location/location.api'

import { SoilqualityApi } from './soilquality/soilquality.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Listing extends ListingApi {}

  export class Location extends LocationApi {}

  export class Soilquality extends SoilqualityApi {}
}
