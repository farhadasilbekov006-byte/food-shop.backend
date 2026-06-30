import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class User {    
    @Prop({ required: true, trim: true} )
    name: string

    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ type: String, default: 'user' })
    role: string;


    createdAt: Date;
    updateAt: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User)