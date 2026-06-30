import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule} from '@nestjs/mongoose'
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb+srv://farhadAdilbekov:0909oppoFa@cluster0.7ribhjn.mongodb.net/?appName=Cluster0'),
    AuthModule,
    CartModule,
    UserModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
