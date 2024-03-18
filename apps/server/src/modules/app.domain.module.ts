import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { ListingDomainModule } from './listing/domain'

import { LocationDomainModule } from './location/domain'

import { SoilqualityDomainModule } from './soilquality/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    ListingDomainModule,

    LocationDomainModule,

    SoilqualityDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
