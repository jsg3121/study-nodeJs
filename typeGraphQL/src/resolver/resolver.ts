import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { customUser } from '../entity/customUser';

@Resolver(customUser)
export class RegisterResolver {
  @Query(() => String, { name: "helloWorld" })
  // Query문에 name으로 요청을 하면 아래 hello()와같이 지정된 함수를 호출하여 값을 리턴한다.
  // 항상 실행이 될 때 최소 하나의 쿼리가 있어야함
  async hello() {
    return 'hi sungyu';
  }


  @Mutation(() => {
    return customUser;
  })
  // 데이터를 추가하거나 수정할 때 사용되는 decorator
  async register(
    @Arg("firstName") firstName: string,
    // 추가하기 위한 데이터를 정해주는 부분
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
  // 데이터를 조회하여 출력할 때 데이터들을 조합하여 새로운 컬럼으로 만들어 화면에 표시
  async fullName(@Root() parent: customUser): Promise<string | null> {
    return `${parent.firstName} ${parent.lastName}`;
  }
}
