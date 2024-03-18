import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Listing } from '../../../modules/listing/domain'

@Entity()
export class Soilquality {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  quality?: string

  @Column({})
  listingId: string

  @ManyToOne(() => Listing, parent => parent.soilqualitys)
  @JoinColumn({ name: 'listingId' })
  listing?: Listing

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
