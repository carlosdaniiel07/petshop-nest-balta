import { BaseEntity } from '@shared/models/base-entity.model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity({
  name: 'order_item',
  schema: 'store',
})
export class OrderItem extends BaseEntity {
  @Column({
    name: 'quantity',
    type: 'int',
    nullable: false,
  })
  quantity: number;

  @Column({
    name: 'price',
    type: 'numeric',
    precision: 11,
    scale: 2,
  })
  price: number;

  @ManyToOne(() => Product, {
    eager: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(
    () => Order,
    order => order.items,
    {
      eager: false,
    },
  )
  @JoinColumn({ name: 'order_id' })
  order?: Order;
}
