import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user;
  },
);

export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return (request.user as any)?.id;
  },
);

export const Public = () => {
  return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata('isPublic', true, descriptor.value);
    return descriptor;
  };
};
