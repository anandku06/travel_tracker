import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModService } from './prisma_mod.service';

describe('PrismaModService', () => {
  let service: PrismaModService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaModService],
    }).compile();

    service = module.get<PrismaModService>(PrismaModService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
