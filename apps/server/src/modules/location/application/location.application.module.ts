import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { LocationDomainModule } from '../domain'
import { LocationController } from './location.controller'

import { ListingDomainModule } from '../../../modules/listing/domain'

import { LocationByListingController } from './locationByListing.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    LocationDomainModule,

    ListingDomainModule,
  ],
  controllers: [LocationController, LocationByListingController],
  providers: [],
})
export class LocationApplicationModule {}
