import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { ListingApplicationModule } from './listing/application'

import { LocationApplicationModule } from './location/application'

import { SoilqualityApplicationModule } from './soilquality/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    ListingApplicationModule,

    LocationApplicationModule,

    SoilqualityApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
