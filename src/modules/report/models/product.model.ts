import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;
  
  @Field()
  title: string;
  
  @Field()
  description: string;
  
  @Field()
  price: number;
  
  @Field()
  createdAt: Date;
  
  @Field()
  updatedAt: Date;
  
  @Field({ nullable: true })
  deletedAt?: Date;
}
