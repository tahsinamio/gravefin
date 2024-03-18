import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SoilqualityDomainFacade } from './soilquality.domain.facade'
import { Soilquality } from './soilquality.model'

@Module({
  imports: [TypeOrmModule.forFeature([Soilquality]), DatabaseHelperModule],
  providers: [SoilqualityDomainFacade, SoilqualityDomainFacade],
  exports: [SoilqualityDomainFacade],
})
export class SoilqualityDomainModule {}
