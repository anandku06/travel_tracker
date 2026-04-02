import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
import { retry } from 'rxjs';

// Apply the JwtAuthGuard to all routes in this controller
@UseGuards(JwtAuthGuard)
@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destServ: DestinationsService) {}

  @Post('create')
  addDestination(@Request() req, @Body() createDestDto: CreateDestinationDto) {
    return this.destServ.createDestination(req.user.userId, createDestDto);
  }

  @Get()
  fetchAllDestinations(@Request() req) {
    return this.destServ.getAllDestinations(req.user.userId);
  }

  @Get(':id')
  fetchDestinationById(@Request() req, @Param('id') id: string) {
    return this.destServ.getDestinationById(req.user.userId, +id);
  }

  @Patch('update/:id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDestDto: UpdateDestinationDto,
  ) {
    return this.destServ.updateDestination(req.user.userId, +id, updateDestDto);
  }

  @Delete('delete/:id')
  delete(@Request() req, @Param('id') id: string) {
    return this.destServ.removeDestination(req.user.userId, +id);
  }
}
