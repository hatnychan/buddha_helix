import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from 'typeorm'
import UserIdLink from './UserIdLink'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn({ name: 'id' })
    readonly id?: number

    @CreateDateColumn({ name: 'created_at' })
    readonly createdAt?: Date

    @UpdateDateColumn({ name: 'updated_at' })
    readonly updatedAt?: Date

    @Column({ name: 'name', type: 'varchar', length: 20, nullable: false })
    name: string

    @Column({ name: 'location', type: 'varchar', length: 50, nullable: false })
    location: string

    @Column({ name: 'lang', type: 'varchar', length: 10, nullable: false })
    lang: string

    @Column({ name: 'role', type: 'smallint', nullable: false })
    readonly role: number

    @OneToMany(() => UserIdLink, (userIdLink) => userIdLink.user)
    userIdLink?: UserIdLink[]

    constructor(name: string, location: string, lang: string, role: number) {
        this.name = name
        this.location = location
        this.lang = lang
        this.role = role
    }
}
export default User
