import moment from "moment";
import Consumo from "../models/consumo.model";
import { Op, where } from "sequelize";

interface IConsumoRepository {
    save(consumo: Consumo): Promise<Consumo>;
    retrieveAll(searchParams: {dispositivoId: number}): Promise<Consumo[]>;
    retrieveById(consumoId: number): Promise<Consumo | null>;
    update(consumo: Consumo): Promise<number>;
    delete(consumoId: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class ConsumoRepository implements IConsumoRepository {
    async save(consumo: Consumo): Promise<Consumo> {
        try {
            return await Consumo.create({
                valor: consumo.valor,
                dispositivoId: consumo.dispositivoId
            });
        } catch (err) {
            throw new Error("Falha ao criar Consumo!");
        }
    }
    async retrieveAll(searchParams: { dispositivoId: number }): Promise<Consumo[]> {
        try {
            let condition: any = {};

            if (searchParams?.dispositivoId) {
                condition = {
                    ...condition,
                    dispositivoId: {
                        [Op.eq]: searchParams.dispositivoId,
                    },
                }
            }

            return await Consumo.findAll({ where: condition });

        } catch (err) {
            throw new Error("Falha ao listar Consumos.");
        }
    }
    async retrieveById(consumoId: number): Promise<Consumo | null> {
        try {
            return await Consumo.findByPk(consumoId);
        } catch (err) {
            throw new Error("Falha ao listar Consumo.");
        }
    }
    async update(consumo: Consumo): Promise<number> {
        const { id, valor, dispositivoId } = consumo;

        try {
            const affectedRows = await Consumo.update(
                { valor, dispositivoId },
                {where: { id: id }}
            );

            return affectedRows[0];
        } catch (err) {
            throw new Error("Falha ao atualizar Consumo.");
        }
    }
    async delete(consumoId: number): Promise<number> {
        try {
            const affectedRows = await Consumo.destroy({
                where: { id: consumoId }
            });

            return affectedRows;
        } catch (err) {
            throw new Error("Falha ao deletar Consumo.");
        }
    }
    async deleteAll(): Promise<number> {
        try {
            return await Consumo.destroy({
                where: {},
                truncate: false
            });
        } catch (err) {
            throw new Error("Falha ao deletar Consumo");
        }    
    }

    // Método para obter o consumo total de hoje
    async getConsumoHoje(): Promise<number> {
        const hoje = moment().startOf('day').toDate();
        const amanha = moment().endOf('day').toDate();
        
        const consumoHoje = await Consumo.sum('valor', {
            where: {
                createdAt: {
                    [Op.between]: [hoje, amanha]
                }
            }
        });

        return consumoHoje || 0;
    }

    // Método para obter o consumo total da semana
    async getConsumoSemana(): Promise<number> {
        const inicioSemana = moment().startOf('week').toDate();
        const fimSemana = moment().endOf('week').toDate();

        const consumoSemana = await Consumo.sum('valor', {
            where: {
                createdAt: {
                    [Op.between]: [inicioSemana, fimSemana]
                }
            }
        });

        return consumoSemana || 0;
    }

    // Método para obter o consumo total do mês
    async getConsumoMes(): Promise<number> {
        const inicioMes = moment().startOf('month').toDate();
        const fimMes = moment().endOf('month').toDate();

        console.log("inicioMes, fimMes: ", inicioMes, fimMes);

        const consumoMes = await Consumo.sum('valor', {
            where: {
                createdAt: {
                    [Op.between]: [inicioMes, fimMes]
                }
            }
        });

        return consumoMes || 0;
    }

}

export default new ConsumoRepository();
