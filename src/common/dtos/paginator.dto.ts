import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

@ArgsType()
export class PaginatioArgs {

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    @Field(() => Int, { defaultValue: 5, nullable: true })
    readonly limit?: number = 5;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Field(() => Int, { defaultValue: 1, nullable: true })
    readonly page?: number = 1;

    @IsOptional()
    @Transform(v => v?.value?.split(','))
    @Field(() => String, { nullable: true })
    readonly order?: string;

    @Expose()
    get offset(): number {
        return this.limit * (this.page - 1);
    }

    @IsOptional()
    @Transform(v => v?.value?.split(','))
    @Field(() => String, { nullable: true })
    key?: string;

    @IsOptional()
    @Transform(v => v?.value?.split(','))
    @Field(() => String, { nullable: true })
    operator?: string;

    @IsOptional()
    @Transform(({ value }) => JSON.parse(value ?? '{}'))
    @Field(() => String, { nullable: true })
    value?: string;

}
