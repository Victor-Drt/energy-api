import { Sequelize } from "sequelize-typescript";
import {config, dialect} from "../config/db.config";
import pg from 'pg';
import Bloco from "../models/bloco.model";
import Dispositivo from "../models/dispositivo.model";
import Consumo from "../models/consumo.model";

class Database {
    public sequelize: Sequelize | undefined;

    constructor() {
        this.connectToDatabase();
    }

    private async connectToDatabase () {
        this.sequelize = new Sequelize(
            config.URL,
            {
                dialectModule: pg,
                pool: {
                    max: config.pool.max,
                    min: config.pool.min,
                    acquire: config.pool.acquire,
                    idle: config.pool.idle
                },
                models: [Bloco, Dispositivo, Consumo]
        });

        await this.sequelize
        .authenticate()
        .then(() => {
          console.log("Conexão estabelecida com sucesso!.");
        })
        .catch((err) => {
          console.error("Não foi possivel estabelecer uma conexão com o banco de dados:", err);
        });
  
    }
}

export default Database;