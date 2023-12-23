import { Injectable } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatioArgs } from 'src/common/dtos/paginator.dto';
import { buildFilter } from 'src/common/utils/filter-constructor';


@Injectable()
export class ItemsService {

  constructor(

    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>

  ) {}
  
  postItem(dt: CreateItemInput): Promise<Item> {
    return this.itemRepo.save(dt);
  }

  getItems(pg: PaginatioArgs): Promise<Item[]> {
    const { limit = 10, page = 1} = pg;  
    const where = buildFilter(pg);
    return this.itemRepo.find({
      where,
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async update(dt: UpdateItemInput): Promise<Item> {
    const updatedItem = await this.itemRepo.preload(dt);
    return await this.itemRepo.save(updatedItem);
  }

  async remove(id: number): Promise<Item> {
    const updatedItem = await this.itemRepo.preload({ id });
    return await this.itemRepo.save({ ...updatedItem, isActive: false });
  }
}
