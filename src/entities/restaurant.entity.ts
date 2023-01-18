import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Type } from './';
import { OpenTimes } from '../interfaces';

@Entity()
@Unique(['id', 'name', 'cnpj'])
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ name: 'name', type: 'varchar', length: 180, nullable: false })
  name: string;

  @Column({ name: 'cnpj', type: 'varchar', length: 14, nullable: false })
  cnpj: string;

  @Column({ name: 'address', type: 'varchar', length: 480, nullable: false })
  address: string;

  @Column({ name: 'phone', type: 'varchar', length: 11, nullable: false })
  phone: string;

  @ManyToOne(() => Type, (type) => type.restaurants, {
    nullable: false,
    eager: true,
  })
  type: Type;

  @Column({ type: 'json', nullable: false })
  openTimes: OpenTimes;
}
