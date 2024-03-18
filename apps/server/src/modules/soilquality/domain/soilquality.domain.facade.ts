import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Soilquality } from './soilquality.model'

import { Listing } from '../../listing/domain'

@Injectable()
export class SoilqualityDomainFacade {
  constructor(
    @InjectRepository(Soilquality)
    private repository: Repository<Soilquality>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Soilquality>): Promise<Soilquality> {
    return this.repository.save(values)
  }

  async update(
    item: Soilquality,
    values: Partial<Soilquality>,
  ): Promise<Soilquality> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Soilquality): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Soilquality> = {},
  ): Promise<Soilquality[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Soilquality> = {},
  ): Promise<Soilquality> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByListing(
    item: Listing,
    queryOptions: RequestHelper.QueryOptions<Soilquality> = {},
  ): Promise<Soilquality[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('listing')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        listingId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
