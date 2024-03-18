import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationListingSubscriber } from './subscribers/notification.listing.subscriber'

import { NotificationLocationSubscriber } from './subscribers/notification.location.subscriber'

import { NotificationSoilqualitySubscriber } from './subscribers/notification.soilquality.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationListingSubscriber,

    NotificationLocationSubscriber,

    NotificationSoilqualitySubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
