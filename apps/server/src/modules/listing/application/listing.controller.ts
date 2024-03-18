import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { Listing, ListingDomainFacade } from '@server/modules/listing/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ListingApplicationEvent } from './listing.application.event'
import { ListingCreateDto, ListingUpdateDto } from './listing.dto'

@Controller('/v1/listings')
export class ListingController {
  constructor(
    private eventService: EventService,
    private listingDomainFacade: ListingDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.listingDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ListingCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.listingDomainFacade.create(body)

    await this.eventService.emit<ListingApplicationEvent.ListingCreated.Payload>(
      ListingApplicationEvent.ListingCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:listingId')
  async findOne(
    @Param('listingId') listingId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.listingDomainFacade.findOneByIdOrFail(
      listingId,
      queryOptions,
    )

    return item
  }

  @Patch('/:listingId')
  async update(
    @Param('listingId') listingId: string,
    @Body() body: ListingUpdateDto,
  ) {
    const item = await this.listingDomainFacade.findOneByIdOrFail(listingId)

    const itemUpdated = await this.listingDomainFacade.update(
      item,
      body as Partial<Listing>,
    )
    return itemUpdated
  }

  @Delete('/:listingId')
  async delete(@Param('listingId') listingId: string) {
    const item = await this.listingDomainFacade.findOneByIdOrFail(listingId)

    await this.listingDomainFacade.delete(item)

    return item
  }
}
