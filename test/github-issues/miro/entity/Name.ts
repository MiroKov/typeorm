import { Column } from "../../../../src/index";

export class Name {
    @Column()
    first: string;

    @Column()
    last: string;
}