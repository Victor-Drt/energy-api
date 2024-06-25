import { Model, Table, Column, DataType } from "sequelize-typescript";


@Table({ tableName: "consumo" })

export default class Consumo extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    })
    id?: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        field: "valor"
    })
    valor?: number;

    @Column({
      type: DataType.INTEGER,
      field: "dispositivoId"
    })
    dispositivoId?: number
}