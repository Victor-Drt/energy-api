import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "blocos",
})

export default class Bloco extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
      })
      id?: number;

      @Column({
        type: DataType.STRING(255),
        field: "nome"
      })
      nome?: string;
}