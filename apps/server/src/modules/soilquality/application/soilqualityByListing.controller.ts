import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SoilqualityDomainFacade } from '@server/modules/soilquality/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SoilqualityApplicationEvent } from './soilquality.application.event'
import { SoilqualityCreateDto } from './soilquality.dto'

import { ListingDomainFacade } from '../../listing/domain'

@Controller('/v1/listings')
export class SoilqualityByListingController {
  constructor(
    private listingDomainFacade: ListingDomainFacade,

    private soilqualityDomainFacade: SoilqualityDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/listing/:listingId/soilqualitys')
  async findManyListingId(
    @Param('listingId') listingId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.listingDomainFacade.findOneByIdOrFail(listingId)

    const items = await this.soilqualityDomainFacade.findManyByListing(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/listing/:listingId/soilqualitys')
  async createByListingId(
    @Param('listingId') listingId: string,
    @Body() body: SoilqualityCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, listingId }

    const item = await this.soilqualityDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SoilqualityApplicationEvent.SoilqualityCreated.Payload>(
      SoilqualityApplicationEvent.SoilqualityCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
