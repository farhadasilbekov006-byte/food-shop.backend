import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


export type ProductDocument = Product & Document

@Schema()
export class Product  {
    @Prop({ required:true })
    name: string

    @Prop( { required: true })
    img: string

    @Prop( { required: true })
    price: number

    @Prop( { required: true})
    desc: string

    @Prop({ type: [{ name: String, img: String }], default: [] })
    ingredient: { name: string; img: string }[]

    @Prop({ type: [{ name: String, img: String, price: Number}], default: [] })
    size: { _id?: Types.ObjectId; name: string; price: number }[]

    @Prop()
    time: string

    @Prop({ type: Number, min: 0, max: 5 ,default: 0 })
    rating: number

    @Prop({type: Number, required: true })
    qty: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)