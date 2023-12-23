import { Field, ID, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateItemInput } from "./create-item.input";
import { IsNumber, IsPositive } from "class-validator";

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {

    @Field(() => Int)
    @IsNumber()
    @IsPositive()
    id: number;
    
}