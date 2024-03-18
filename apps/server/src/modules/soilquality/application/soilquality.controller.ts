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
import {
  Soilquality,
  SoilqualityDomainFacade,
} from '@server/modules/soilquality/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SoilqualityApplicationEvent } from './soilquality.application.event'
import { SoilqualityCreateDto, SoilqualityUpdateDto } from './soilquality.dto'

@Controller('/v1/soilqualitys')
export class SoilqualityController {
  constructor(
    private eventService: EventService,
    private soilqualityDomainFacade: SoilqualityDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.soilqualityDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SoilqualityCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.soilqualityDomainFacade.create(body)

    await this.eventService.emit<SoilqualityApplicationEvent.SoilqualityCreated.Payload>(
      SoilqualityApplicationEvent.SoilqualityCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:soilqualityId')
  async findOne(
    @Param('soilqualityId') soilqualityId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.soilqualityDomainFacade.findOneByIdOrFail(
      soilqualityId,
      queryOptions,
    )

    return item
  }

  @Patch('/:soilqualityId')
  async update(
    @Param('soilqualityId') soilqualityId: string,
    @Body() body: SoilqualityUpdateDto,
  ) {
    const item =
      await this.soilqualityDomainFacade.findOneByIdOrFail(soilqualityId)

    const itemUpdated = await this.soilqualityDomainFacade.update(
      item,
      body as Partial<Soilquality>,
    )
    return itemUpdated
  }

  @Delete('/:soilqualityId')
  async delete(@Param('soilqualityId') soilqualityId: string) {
    const item =
      await this.soilqualityDomainFacade.findOneByIdOrFail(soilqualityId)

    await this.soilqualityDomainFacade.delete(item)

    return item
  }
}
