import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schema/cart.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>
  ) {}

  async getCart(userId: string): Promise<CartDocument | null> {
    return this.cartModel
      .findOne({ userId })
      .populate('items.productId')
      .exec();
  }

  async addItem(
    userId: string,
    productId: string,
    qty: number,
    selectedSize: { name: string; price: number }
  ): Promise<CartDocument> {
    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      cart = new this.cartModel({ userId, items: [] });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (item) {
      item.qty += qty;
    } else {
      cart.items.push({
        productId: new Types.ObjectId(productId),
        qty,
        selectedSize,
      });
    }

    await cart.save();
    
    return cart.populate('items.productId')
  }

  async updateQty(userId: string, productId: string, qty: number) {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) return null;

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (item) {
      item.qty = qty;
    }

    return cart.save();
  }

  async removeItem(userId: string, productId: string) {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) return null;

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId
    );

    return cart.save();
  }
}