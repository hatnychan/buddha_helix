import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm'

@Entity('num_param')
export class NumParam {
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

    @Column({ name: 'value', type: 'double precision', nullable: true })
    readonly value: number

    constructor(code: string, key: string, value: number) {
        this.code = code
        this.key = key
        this.value = value
    }
}
export default NumParam
