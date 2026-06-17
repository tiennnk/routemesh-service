import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserRole } from '@app/shared';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ unique: true, length: 10 })
  phone!: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ type: 'enum', enum: UserRole })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
