import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductFilterDto } from './filter/product-filter.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}
    
    @Get()
    async findAll(@Query() filter: ProductFilterDto) {
        return this.productService.findAll(filter)
    }

    @Get('/all')
    async getAllProducts() {
        return this.productService.getAllProducts()
    }
    
    @Post()
    async createProduct(@Body() dto:CreateProductDto) {
       return this.productService.createProduct(dto)
    }

    @Delete(':id') 
    async deleteOne(@Param('id') id: string) {
        return this.productService.deleteOne(id);
    }

    @Get(':id') 
    async getProductById(@Param('id') id: string) {
        return this.productService.getProductById(id)
    }

    @Patch(':id') 
    async getProductByIdAndUpdate(@Param('id') id: string ,@Body() dto: UpdateProductDto){
        return this.productService.getProductByIdAndUpdate(id, dto)
    }
}
