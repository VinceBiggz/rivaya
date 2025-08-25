import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/database/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    }
    
