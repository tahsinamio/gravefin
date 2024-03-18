import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SoilqualityDomainModule } from '../domain'
import { SoilqualityController } from './soilquality.controller'

import { ListingDomainModule } from '../../../modules/listing/domain'

import { SoilqualityByListingController } from './soilqualityByListing.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    SoilqualityDomainModule,

    ListingDomainModule,
  ],
  controllers: [SoilqualityController, SoilqualityByListingController],
  providers: [],
})
export class SoilqualityApplicationModule {}
