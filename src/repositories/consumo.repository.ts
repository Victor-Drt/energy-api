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

            return await Consumo.findAll({ where: condition, order: [['createdAt', 'DESC']] });

        } catch (err) {
            throw new Error("Falha ao listar Consumos.");
        }
    }

    async retrieveByDispositivoId(dispositivoId: number): Promise<Consumo[]> {
        return await Consumo.findAll({where: {dispositivoId}});
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
    
}

export default new ConsumoRepository();
