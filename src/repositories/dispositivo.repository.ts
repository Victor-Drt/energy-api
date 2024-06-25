import Dispositivo from "../models/dispositivo.model";
import { Op, where } from "sequelize";

interface IDispositivoRepository {
    save(dispositivo: Dispositivo): Promise<Dispositivo>;
    retrieveAll(searchParams: {nome: string}): Promise<Dispositivo[]>;
    retrieveById(dispositivoId: number): Promise<Dispositivo | null>;
    update(dispositivo: Dispositivo): Promise<number>;
    delete(dispositivoId: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class DispositivoRepository implements IDispositivoRepository {
    async save(dispositivo: Dispositivo): Promise<Dispositivo> {
        try {
            return await Dispositivo.create({
                nome: dispositivo.nome,
                blocoId: dispositivo.blocoId
            });
        } catch (err) {
            throw new Error("Falha ao criar dispositivo!");
        }
    }
    async retrieveAll(searchParams: { nome: string; }): Promise<Dispositivo[]> {
        try {
            let condition: any = {};

            if (searchParams?.nome) {
                condition = {
                    ...condition,
                    nome: {
                        [Op.like]: `%${searchParams.nome}%`,
                    },
                }
            }

            return await Dispositivo.findAll({ where: condition });

        } catch (err) {
            throw new Error("Falha ao listar dispositivos.");
        }
    }
    async retrieveById(dispositivoId: number): Promise<Dispositivo | null> {
        try {
            return await Dispositivo.findByPk(dispositivoId);
        } catch (err) {
            throw new Error("Falha ao listar dispositivo.");
        }
    }
    async update(dispositivo: Dispositivo): Promise<number> {
        const { id, nome, blocoId } = dispositivo;

        try {
            const affectedRows = await Dispositivo.update(
                { nome, blocoId },
                {where: { id: id }}
            );

            return affectedRows[0];
        } catch (err) {
            throw new Error("Falha ao atualizar dispositivo.");
        }
    }
    async delete(dispositivoId: number): Promise<number> {
        try {
            const affectedRows = await Dispositivo.destroy({
                where: { id: dispositivoId }
            });

            return affectedRows;
        } catch (err) {
            throw new Error("Falha ao deletar dispositivo.");
        }
    }
    async deleteAll(): Promise<number> {
        try {
            return await Dispositivo.destroy({
                where: {},
                truncate: false
            });
        } catch (err) {
            throw new Error("Falha ao deletar dispositivo");
        }    
    }
    
}

export default new DispositivoRepository();
