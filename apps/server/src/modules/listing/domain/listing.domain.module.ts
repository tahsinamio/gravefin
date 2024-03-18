import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ListingDomainFacade } from './listing.domain.facade'
import { Listing } from './listing.model'

@Module({
  imports: [TypeOrmModule.forFeature([Listing]), DatabaseHelperModule],
  providers: [ListingDomainFacade, ListingDomainFacade],
  exports: [ListingDomainFacade],
})
export class ListingDomainModule {}
