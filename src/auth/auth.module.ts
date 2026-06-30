import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.dto';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: 'SECRET_KEY',
            signOptions: { expiresIn: "7d" },
        }),
        MongooseModule.forFeature([
        {name: User.name , schema: UserSchema}
    ])],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}