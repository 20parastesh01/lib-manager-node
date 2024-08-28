import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Name } from "../../types/name";
import { BookStatus } from "../../types/book-status";

@Entity("books")
export class BookEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: Name;

  @Column()
  author!: Name;

  @Column()
  publisher!: Name;

  @Column()
  addedBy!: string;

  @Column({ type: "enum", enum: BookStatus, default: BookStatus.AVAILABLE })
  status!: BookStatus;

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;
}
