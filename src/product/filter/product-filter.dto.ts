import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class ProductFilterDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    typeFood?: string

    @IsOptional()
    @IsString()
    typeMeal?: string

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minPrice?: number

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxPrice?: number
}