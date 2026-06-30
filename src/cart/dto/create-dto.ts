import { Type } from "class-transformer";
import { IsNumber, IsString, Min, ValidateNested } from "class-validator";

export class SelectedSize {
    @IsString()
    name: string

    @IsNumber ()
    price: number
}

export class CrudCart {
    
    @IsString()
    productId: string

    @IsNumber()
    @Min(1)
    qty: number;

    @ValidateNested()
    @Type(() => SelectedSize)
    selectedSize: SelectedSize
}