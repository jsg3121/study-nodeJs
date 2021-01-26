import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { customUser } from '../entity/customUser';

@Resolver(customUser)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'hi';
  }

  @Mutation(() => {
    return customUser;
  })
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
  ): Promise<customUser> {
    const user = await customUser.create({
      firstName,
      lastName,
      email,
    }).save();
    console.log(user);
    return user;
  }

  @FieldResolver(() => String, { nullable: true })
  async fullName(@Root() parent: customUser): Promise<string | null> {
    return parent.firstName ? `${parent.firstName}` : null;
  }
}
