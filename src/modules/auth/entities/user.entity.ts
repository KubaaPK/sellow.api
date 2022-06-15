import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users', schema: 'auth' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ nullable: false, unique: true })
  public readonly username: string;

  @Column({ nullable: false, unique: true })
  public readonly email: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  public readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp without time zone' })
  public readonly updatedAt: Date;
}
