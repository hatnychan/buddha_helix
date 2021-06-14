import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm'

@Entity('game_log')
export class GameLog {
    @PrimaryGeneratedColumn({ name: 'id' })
    readonly id?: number

    @CreateDateColumn({ name: 'created_at' })
    readonly createdAt?: Date

    @UpdateDateColumn({ name: 'updated_at' })
    readonly updatedAt?: Date

    @Column({ name: 'code', type: 'varchar', length: 50, nullable: false })
    readonly code: string

    @Column({ name: 'key', type: 'varchar', length: 50, nullable: false })
    readonly key: string

    @Column({ name: 'lang', type: 'varchar', length: 10, nullable: false })
    readonly lang: string

    @Column({ name: 'value', type: 'varchar', length: 1000, nullable: true })
    readonly value: string

    constructor(code: string, key: string, lang: string, value: string) {
        this.code = code
        this.key = key
        this.lang = lang
        this.value = value
    }
}
export default GameLog
