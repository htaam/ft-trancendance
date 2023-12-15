import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Cat {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    eyes: string;

    @Column('json', { nullable: true})
    color: string[];
}