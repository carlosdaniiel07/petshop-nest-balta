import { BaseEntity } from '@shared/models/base-entity.model';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'products',
  schema: 'store',
})
export class Product extends BaseEntity {
  @Column({
    name: 'title',
    length: 100,
    nullable: false,
  })
  title: string

  @Column({
    name: 'description',
    length: 255,
    nullable: false,
  })
  description: string

  @Column({
    name: 'price',
    type: 'numeric',
    precision: 11,
    scale: 2,
  })
  price: number
}
