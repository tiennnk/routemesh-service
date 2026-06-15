import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { DriverType, DriverStatus } from '@app/shared';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true, length: 10 })
  phone!: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ type: 'enum', enum: DriverType, default: DriverType.MOTORBIKE })
  type: DriverType | undefined;

  @Column({ type: 'enum', enum: DriverStatus, default: DriverStatus.OFFLINE })
  status: DriverStatus | undefined;
}
export { DriverType, DriverStatus };

