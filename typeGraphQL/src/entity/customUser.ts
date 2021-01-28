import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class customUser extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column() // 연동된 db에 새로 테이블을 추가하여 볼 수 있도록 해줌
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  // @Field({ nullable: true })
  // @Column()
  // fullName: string | null;

  @Field()
  @Column()
  email: string;
}
