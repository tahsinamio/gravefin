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

import { User } from '../../../modules/user/domain'

import { Location } from '../../../modules/location/domain'

import { Soilquality } from '../../../modules/soilquality/domain'

@Entity()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  imageUrl?: string

  @ColumnNumeric({ nullable: true, type: 'numeric' })
  price?: number

  @Column({ nullable: true })
  legroom?: string

  @Column({ nullable: true })
  description?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.listings)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Location, child => child.listing)
  locations?: Location[]

  @OneToMany(() => Soilquality, child => child.listing)
  soilqualitys?: Soilquality[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
