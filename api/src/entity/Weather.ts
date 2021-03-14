import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Weather {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    minTemperature: number;

    @Column()
    maxTemperature: number;

    @Column()
    timestamp: Date;

    constructor(minTemperature: number, maxTemperature: number) {
        this.minTemperature = minTemperature;
        this.maxTemperature = maxTemperature;
        this.timestamp = new Date();
    }
}