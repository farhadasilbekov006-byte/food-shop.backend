import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type CartDocument = Cart & Document;

@Schema({ timestamps: true})

export class Cart {
    @Prop({required: true, type: Types.ObjectId, ref: "User", unique: true})
    userId: Types.ObjectId

    @Prop({
        type: [
        {
                productId: { type: Types.ObjectId, ref: "Product", required: true},
                qty: { type: Number, required: true },
                selectedSize: {
                    name: String,
                    price: Number,
                },
        },
    ]})
    items: { 
        productId: Types.ObjectId; 
        qty: number;
        selectedSize: {
            name: string;
            price: number;
    };
}[]
}

export const CartSchema = SchemaFactory.createForClass(Cart)