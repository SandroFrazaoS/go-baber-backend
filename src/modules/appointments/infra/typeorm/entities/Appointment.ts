// entidade de agendamento ou models - formato dos dados
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

/**
 * Um para um (OneToOne)
 * um para muitos (OneToMany)
 * Muitos para Muitos (ManyToMany)
 */

import User from '@modules/users/infra/typeorm/entities/User';

// decoration é como uma funcao, nossa classe é um parametros
// comando particular do type script
@Entity('appointments')
export default class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
