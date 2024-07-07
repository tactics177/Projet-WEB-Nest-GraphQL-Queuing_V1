import { Resolver, Query, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class HealthCheckResult {
  @Field()
  result: string;
}

@Resolver()
export class HealthCheckResolver {
  @Query(() => HealthCheckResult)
  healthCheck(): HealthCheckResult {
    return { result: 'ok' };
  }
}
