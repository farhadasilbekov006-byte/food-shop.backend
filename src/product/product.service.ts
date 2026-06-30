import { Injectable, Query } from '@nestjs/common';
import { Product, ProductDocument } from './schema/schema.product';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductFilterDto } from './filter/product-filter.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product';

@Injectable()
export class ProductService {
    constructor( 
        @InjectModel(Product.name) private productModel: Model<ProductDocument>  
    ) {}

    async findAll(filter: ProductFilterDto){
     const query: any = {}

     if (filter.name) {
        query.name = {$regex: filter.name, $options: 'i'}

    if (filter.typeFood) {
        query.typeFood = filter.typeFood;
    }

    if (filter.typeMeal) {
        query.typeMeal = filter.typeMeal;
    }

    if (filter.minPrice || filter.maxPrice) {
        query.price = {}

        if (filter.minPrice) query.price.$gte = filter.maxPrice
        if(filter.maxPrice) query.price.$lte = filter.minPrice
    }
     
    return this.productModel.find(query)
    
     }
    }

    async getAllProducts() {
        return this.productModel.find().exec()
    }

    async createProduct(dto: CreateProductDto) {
        const product = new this.productModel(dto)
        return product.save()
    }

    async deleteOne(id: string) {
        await this.productModel.findByIdAndDelete(id).exec()
        return { message: 'Товар удален' }
    }

    async getProductByIdAndUpdate(id: string ,dto: UpdateProductDto) {
        return this.productModel.findByIdAndUpdate(id, dto, {new: true}).exec()
    }

    async getProductById(id: string) {
        return this.productModel.findById(id).exec()
    }
}
