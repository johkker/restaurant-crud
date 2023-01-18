import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Restaurant } from './';

@Entity()
@Unique(['id', 'name'])
export class Type {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ name: 'name', type: 'varchar', length: 60, nullable: false })
  name: string;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.type)
  restaurants: Restaurant[];
}
