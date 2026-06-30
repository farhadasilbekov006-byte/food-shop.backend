import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schema/cart.schema';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Product, ProductSchema } from 'src/product/schema/schema.product';

@Module({
    imports : [MongooseModule.forFeature([
        {name: Cart.name , schema: CartSchema},
        { name: Product.name, schema: ProductSchema }
    ])],
    controllers: [CartController],
    providers: [CartService]
})
export class CartModule {}
