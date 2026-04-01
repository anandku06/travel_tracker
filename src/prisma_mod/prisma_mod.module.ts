import { Global, Module } from '@nestjs/common';
import { PrismaModService } from './prisma_mod.service';

// This module provides the PrismaModService, which extends the PrismaClient and manages the database connection lifecycle. By marking it as a global module, we ensure that the PrismaModService is available throughout the application without needing to import the PrismaModModule in every module that requires it.
@Global()
@Module({
  providers: [PrismaModService],
  // By exporting the PrismaModService, we allow other modules to inject it and use its functionality without needing to import the PrismaModModule directly.
  exports: [PrismaModService],
})
export class PrismaModModule {}
