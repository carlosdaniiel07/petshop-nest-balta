import { Address } from './address.model';
import { CreditCard } from './credit-card.model';
import { Pet } from './pet.model';

export interface Customer {
  name: string;
  document: string;
  email: string;
  pets: Pet[];
  billingAddress: Address;
  shippingAddress: Address;
  creditCard: CreditCard;
}
