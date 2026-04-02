/**
 * why JwtAuthGuard?
 * The JwtAuthGuard is a custom authentication guard that extends the built-in AuthGuard from the @nestjs/passport package. 
 * It is used to protect routes in the NestJS application by ensuring that only authenticated users with a valid JWT (JSON Web Token) can access those routes. 
 * By applying the JwtAuthGuard to a controller or specific routes, you can enforce authentication and secure your API endpoints from unauthorized access.
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
