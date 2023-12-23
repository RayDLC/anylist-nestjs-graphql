import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { PaginatioArgs } from 'src/common/dtos/paginator.dto';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  postItem(
    @Args('createItemInput') dt: CreateItemInput
  ): Promise<Item> {
    return this.itemsService.postItem(dt);
  }

  @Query(() => [Item], { name: 'items' })
  findAll(
    @Args() pg?: PaginatioArgs,
  ): Promise<Item[]> {
    return this.itemsService.getItems(pg);
  }

  @Mutation(() => Item)
  updateItem(
    @Args('updateItemInput') dt: UpdateItemInput
  ): Promise<Item> {
    return this.itemsService.update(dt);
  }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.remove(id);
  }
}
