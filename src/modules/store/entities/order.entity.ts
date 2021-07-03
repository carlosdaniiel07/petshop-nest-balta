import { BaseEntity } from '@shared/models/base-entity.model';
import { Column, Entity, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity({
  name: 'order',
  schema: 'store',
})
export class Order extends BaseEntity {
  @Column({
    name: 'customer',
    type: 'char',
    length: 11,
    nullable: false,
  })
  customer: string;

  @Column({
    name: 'number',
    type: 'char',
    length: 7,
    nullable: false,
  })
  number: string;

  @OneToMany(
    () => OrderItem,
    orderItem => orderItem.order,
    {
      eager: false,
      cascade: ['insert'],
    },
  )
  items: OrderItem[];
}
