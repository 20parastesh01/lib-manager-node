import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Name } from "../../types/name";
import { Password } from "../../types/password";
import { Email } from "../../types/email";

@Entity("users")
@Unique(["email"])
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: Name;

  @Column()
  password!: Password;

  @Column()
  email!: Email;
}
