import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaModService } from 'src/prisma_mod/prisma_mod.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaModService) {}

  async createDestination(userId: number, createDestDto: CreateDestinationDto) {
    return this.prisma.destination.create({
      data: {
        ...createDestDto,
        travelDate: new Date(createDestDto.travelDate).toISOString(),
        userId,
      },
    });
  }

  async getAllDestinations(userId: number) {
    return this.prisma.destination.findMany({
      where: { userId },
    });
  }

  async getDestinationById(userId: number, id: number) {
    const destination = await this.prisma.destination.findFirst({
      where: { id, userId },
    });

    if (!destination)
      throw new NotFoundException(`Destination not found with this id: ${id}`);

    return destination;
  }

  async removeDestination(userId: number, id: number) {
    const destination = await this.getDestinationById(userId, id);

    return this.prisma.destination.delete({
      where: { id },
    });
  }

  async updateDestination(
    userId: number,
    id: number,
    updateDestDto: UpdateDestinationDto,
  ) {
    await this.getDestinationById(userId, id);

    return this.prisma.destination.update({
      where: { id },
      data: updateDestDto,
    });
  }
}
