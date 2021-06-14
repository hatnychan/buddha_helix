import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm'
import User from './User'

@Entity('user_id_link')
export class UserIdLink {
    @PrimaryGeneratedColumn({ name: 'id' })
    readonly id?: number

    @CreateDateColumn({ name: 'created_at' })
    readonly createdAt?: Date

    @UpdateDateColumn({ name: 'updated_at' })
    readonly updatedAt?: Date

    @Column({ name: 'user_id', type: 'integer', nullable: false })
    readonly userId: number

    @Column({ name: 'linked_id_name', type: 'varchar', length: 50, nullable: false })
    readonly linkedIdName: string

    @Column({ name: 'linked_id', type: 'varchar', length: 500, nullable: false })
    readonly linkedId: string

    @ManyToOne(() => User, (user) => user.userIdLink, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user?: User

    constructor(userId: number, linkedIdName: string, linkedId: string) {
        this.userId = userId
        this.linkedIdName = linkedIdName
        this.linkedId = linkedId
    }
}
export default UserIdLink
