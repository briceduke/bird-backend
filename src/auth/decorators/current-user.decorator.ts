import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/models/user.model';

export const getCurrentUserByContext = (context: ExecutionContext): User => {
	if (context.getType() === "http")
		return context.switchToHttp().getRequest().user as User;
};

export const CurrentUser = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx)
);
