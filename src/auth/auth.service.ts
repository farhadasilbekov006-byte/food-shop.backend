import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from 'src/user/schema/user.dto';
import { RegisterDto } from './schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) {}

    async login (email: string, password: string) {
        const user = await this.userModel.findOne({ email: email.toLocaleLowerCase().trim() })
        console.log(user)
        if(!user) {
            throw new UnauthorizedException('User not found')
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = {
            sub: user._id,
            email: user.email
        }

        return {
            access_token: this.jwtService.sign(payload),
            user
            
        }
    }
    
    async register (dto: RegisterDto) {
        const email = dto.email.toLocaleLowerCase().trim()
        
        const existUser = await this.userModel.findOne({email})
        
        if (existUser) {
            throw new BadRequestException('Email already exists')
        }
        
        const hash = await bcrypt.hash(dto.password, 10)
        
        return this.userModel.create({
            ...dto,
            email,
            password: hash 
            
        })
        
    }
    
}
