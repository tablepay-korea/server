import { Owner } from './../user/owner/entities/owner.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from 'src/shop/entities/shop.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  HttpException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop> {
  constructor() {
    super();
  }

  async createShop(shopData: CreateShopDto, owner: Owner): Promise<Shop> {
    try {
      const created_shop = this.create({ ...shopData });
      created_shop.owner = owner;
      return await this.save(created_shop);
    } catch (e) {
      throw new ServiceUnavailableException('Server Error');
    }
  }
  // async findOneOwner(provider: string, providerId: string): Promise<Owner> {
  //   try {
  //     const user = await this.findOne({ provider, providerId });
  //     if (!user) {
  //       return null;
  //     }
  //     return user;
  //   } catch (e) {
  //     throw new ServiceUnavailableException('Server Error');
  //   }
  // }
}
