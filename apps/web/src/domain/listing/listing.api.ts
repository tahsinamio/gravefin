import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Listing } from './listing.model'

export class ListingApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Listing>,
  ): Promise<Listing[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/listings${buildOptions}`)
  }

  static findOne(
    listingId: string,
    queryOptions?: ApiHelper.QueryOptions<Listing>,
  ): Promise<Listing> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/listings/${listingId}${buildOptions}`)
  }

  static createOne(values: Partial<Listing>): Promise<Listing> {
    return HttpService.api.post(`/v1/listings`, values)
  }

  static updateOne(
    listingId: string,
    values: Partial<Listing>,
  ): Promise<Listing> {
    return HttpService.api.patch(`/v1/listings/${listingId}`, values)
  }

  static deleteOne(listingId: string): Promise<void> {
    return HttpService.api.delete(`/v1/listings/${listingId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Listing>,
  ): Promise<Listing[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/listings${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Listing>,
  ): Promise<Listing> {
    return HttpService.api.post(`/v1/users/user/${userId}/listings`, values)
  }
}
