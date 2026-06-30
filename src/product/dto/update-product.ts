import { IsNumber, IsString, Min } from "class-validator";

export class UpdateProductDto {
    @IsString()
    name?: string
    
    @IsString()
    img?: string
    
    @IsNumber()
    @Min(1)
    price?: number
    
    @IsString()
    desc?: string
    
    @IsString()
    ingredient?: string[]
    
    @IsString()
    size?: string[]
    
    @IsString()
    time?: string
    
    @IsNumber()
    rating?: number
    
    @IsNumber()
    qty?: number
}