import moment from "moment";
import Consumo from "../models/consumo.model";
import { col, fn, Op, where } from "sequelize";

interface IConsumoRepository {
    save(consumo: Consumo): Promise<Consumo>;
    retrieveAll(searchParams: { dispositivoId: number }): Promise<Consumo[]>;
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
                dispositivoId: consumo.dispositivoId,
                blocoId: consumo.blocoId,

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
        return await Consumo.findAll({ where: { dispositivoId }, order: [['createdAt', 'DESC']] });
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
                { where: { id: id } }
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

    async getPicosPorSemana(data: string): Promise<any[]> {
        try {
            // Conversão da data recebida para um objeto moment
            const date = moment(data);

            // Verifica se a data é válida
            if (!date.isValid()) {
                throw new Error("Data inválida.");
            }

            // Início e fim do mês
            const startOfMonth = date.clone().startOf('month').toDate();
            const endOfMonth = date.clone().endOf('month').toDate();

            // Busca os picos de consumo
            const consumos = await Consumo.findAll({
                attributes: [
                    'blocoId',
                    [fn('DATE_TRUNC', 'week', col('createdAt')), 'semana'],
                    [fn('SUM', col('valor')), 'consumoTotal'],
                    [fn('MAX', col('valor')), 'picoConsumo']
                ],
                where: {
                    createdAt: {
                        [Op.between]: [startOfMonth, endOfMonth] // Filtra por mês
                    }
                },
                group: ['blocoId', 'semana'],
                order: [[fn('DATE_TRUNC', 'week', col('createdAt')), 'ASC']]
            });

            // Mapeia os resultados para um formato legível
            return consumos.map(consumo => ({
                blocoId: consumo.get('blocoId'),
                semana: consumo.get('semana'),
                consumoTotal: consumo.get('consumoTotal'),
                picoConsumo: consumo.get('picoConsumo')
            }));
        } catch (error) {
            console.error("Erro ao buscar picos por semana:", error);
            throw new Error("Falha ao obter picos de consumo.");
        }
    }

}

export default new ConsumoRepository();
