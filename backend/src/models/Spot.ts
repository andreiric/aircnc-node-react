import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, AfterLoad} from "typeorm";

import User from './User';

@Entity()
export default class Spot {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    thumbnail: string;

    thumbnail_url: string;

    @Column()
    company: string;

    @Column({ type: 'numeric', precision: 15, scale: 2 })
    price: number;

    @Column()
    techs: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @AfterLoad()
    onAfterLoad() {
      this.thumbnail_url = `http://localhost:3333/files/${this.thumbnail}`
    }

 }
