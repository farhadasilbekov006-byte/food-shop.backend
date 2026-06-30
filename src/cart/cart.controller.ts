import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CrudCart } from './dto/create-dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
    constructor (
        private readonly cartService: CartService
    ) {}
    
    @Get()
    async getCart(@Req() req) {
        return this.cartService.getCart(req.user.userId)
    }

    @Post('add')
    async addItem(@Req() req, @Body() dto: CrudCart) {
        return this.cartService.addItem(req.user.userId, dto.productId, dto.qty, dto.selectedSize)
    }

    @Patch('update')
    async updateQty(@Req() req, @Body() dto: CrudCart) {
        return this.cartService.updateQty(req.user.userId, dto.productId, dto.qty)
    }

    @Delete(':productId')
  async removeItem(@Req() req, @Param('productId') productId: string) {
    return this.cartService.removeItem(req.user.userId, productId);
  }

}