import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { LocationDomainFacade } from '@server/modules/location/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { LocationApplicationEvent } from './location.application.event'
import { LocationCreateDto } from './location.dto'

import { ListingDomainFacade } from '../../listing/domain'

@Controller('/v1/listings')
export class LocationByListingController {
  constructor(
    private listingDomainFacade: ListingDomainFacade,

    private locationDomainFacade: LocationDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/listing/:listingId/locations')
  async findManyListingId(
    @Param('listingId') listingId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.listingDomainFacade.findOneByIdOrFail(listingId)

    const items = await this.locationDomainFacade.findManyByListing(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/listing/:listingId/locations')
  async createByListingId(
    @Param('listingId') listingId: string,
    @Body() body: LocationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, listingId }

    const item = await this.locationDomainFacade.create(valuesUpdated)

    await this.eventService.emit<LocationApplicationEvent.LocationCreated.Payload>(
      LocationApplicationEvent.LocationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
