import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdatePostDto {
  @Field()
  title?: string;

  @Field()
  description?: string;

  @Field()
  user_id?: number;
}
