import { Entity, PrimaryGeneratedColumn, Column } from "../../../../src/index";
import { Name } from "./Name";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column(type => Name)
    name: Name;
}