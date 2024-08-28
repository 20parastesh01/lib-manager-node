import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookEntity } from "./book.entity";

@Entity("borrows")
export class BorrowEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  bookId!: string;

  @OneToOne(() => BookEntity, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "bookId" })
  book!: BookEntity;

  @Column()
  borrowedBy!: string;

  @Column()
  returnDate!: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @Column({
    type: "date",
    nullable: true,
  })
  returnedAt?: Date;
}
