import {
  PrimaryGeneratedColumn,
  BaseEntity, Entity, Column
} from 'typeorm';

@Entity('dummy')
export class Dummy extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}
