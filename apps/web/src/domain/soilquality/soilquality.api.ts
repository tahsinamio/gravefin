import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Soilquality } from './soilquality.model'

export class SoilqualityApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Soilquality>,
  ): Promise<Soilquality[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/soilqualitys${buildOptions}`)
  }

  static findOne(
    soilqualityId: string,
    queryOptions?: ApiHelper.QueryOptions<Soilquality>,
  ): Promise<Soilquality> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/soilqualitys/${soilqualityId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Soilquality>): Promise<Soilquality> {
    return HttpService.api.post(`/v1/soilqualitys`, values)
  }

  static updateOne(
    soilqualityId: string,
    values: Partial<Soilquality>,
  ): Promise<Soilquality> {
    return HttpService.api.patch(`/v1/soilqualitys/${soilqualityId}`, values)
  }

  static deleteOne(soilqualityId: string): Promise<void> {
    return HttpService.api.delete(`/v1/soilqualitys/${soilqualityId}`)
  }

  static findManyByListingId(
    listingId: string,
    queryOptions?: ApiHelper.QueryOptions<Soilquality>,
  ): Promise<Soilquality[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/listings/listing/${listingId}/soilqualitys${buildOptions}`,
    )
  }

  static createOneByListingId(
    listingId: string,
    values: Partial<Soilquality>,
  ): Promise<Soilquality> {
    return HttpService.api.post(
      `/v1/listings/listing/${listingId}/soilqualitys`,
      values,
    )
  }
}
