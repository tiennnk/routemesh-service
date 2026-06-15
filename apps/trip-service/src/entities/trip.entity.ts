import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TripStatus } from '@app/shared';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  riderId!: number;

  @Column({ nullable: true })
  driverId?: number;

  @Column()
  pickupAddress!: string;

  @Column()
  destination!: string;

  @Column({ type: 'enum', enum: TripStatus, default: TripStatus.PENDING })
  status!: TripStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
