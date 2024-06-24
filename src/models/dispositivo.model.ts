import { Model, Table, Column, DataType } from "sequelize-typescript";


@Table({ tableName: "dispositivo" })

export default class Dispositivo extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    })
    id?: number;

    @Column({
        type: DataType.STRING,
        field: "nome"
    })
    nome?: string;

    @Column({
      type: DataType.INTEGER,
      field: "blocoId"
    })
    blocoId?: number
}