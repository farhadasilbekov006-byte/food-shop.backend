import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, Min, ValidateNested } from "class-validator";


class SizeDto {
    @IsString()
    name: string

    @IsNumber()
    price: number
}

class IngredientDto {
    @IsString()
    name: string

    @IsString()
    img: string
}

export class CreateProductDto {
    @IsString()
    name: string
    
    @IsString()
    img: string
    
    @IsNumber()
    @Min(1)
    price: number
    
    @IsString()
    desc: string
    
    @IsArray()
    @ValidateNested({ each:true })
    @Type(() => IngredientDto)
    ingredient: IngredientDto[]
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SizeDto)
    size: SizeDto[]
    
    @IsString()
    time: string
    
    @IsNumber()
    rating: number
    
    @IsNumber()
    qty: number
}