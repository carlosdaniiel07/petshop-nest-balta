import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePetDto, UpdatePetDto } from '@modules/backoffice/dto';
import { Customer } from '@modules/backoffice/models/customer.model';

@Injectable()
export class PetService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}
  
  async save(document: string, createPetDto: CreatePetDto): Promise<void> {
    await this.customerModel.findOneAndUpdate(
      {
        document,
      },
      {
        $push: {
          pets: createPetDto,
        },
      },
      {
        upsert: true,
        useFindAndModify: false,
        new: true,
      },
    );
  }

  async update(
    document: string,
    petId: string,
    updatePetDto: UpdatePetDto,
  ): Promise<void> {
    await this.customerModel.findOneAndUpdate(
      {
        document,
        'pets._id': petId,
      },
      {
        $set: {
          'pets.$': updatePetDto,
        },
      },
      {
        useFindAndModify: false,
      },
    );
  }
}
