import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export function decorateRequest(data: string, ctx: ExecutionContext): { [key: string]: unknown; } {
  const request = ctx.switchToHttp().getRequest();

  return data ? request.body[data] : {
    title: request.body.title,
    year: request.body.year
  };
}

export const ReqMovie = createParamDecorator(decorateRequest);