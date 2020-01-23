import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from "typeorm";

import User from "./User";
import Spot from "./Spot";

@Entity()
export default class Booking {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @Column({ default: false })
    appoved: boolean;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(type => Spot)
    @JoinColumn({ name: 'spot_id' })
    spot: Spot;

}
