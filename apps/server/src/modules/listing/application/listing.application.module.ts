import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ListingDomainModule } from '../domain'
import { ListingController } from './listing.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ListingByUserController } from './listingByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, ListingDomainModule, UserDomainModule],
  controllers: [ListingController, ListingByUserController],
  providers: [],
})
export class ListingApplicationModule {}
