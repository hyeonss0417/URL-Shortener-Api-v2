import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export const urlAccessKeyLength = 20;

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("text")
  url: string;
  @Column({ length: urlAccessKeyLength, unique: true, nullable: false })
  access_key: string;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_date: string;
  @Column({ default: 0 })
  access_count: number;
}
