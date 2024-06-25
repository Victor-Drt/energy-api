import Bloco from "../models/bloco.model";
import { Op, where } from "sequelize";


interface IBlocoRepository {
    save(bloco: Bloco): Promise<Bloco>;
    retrieveAll(searchParams: {nome: string}): Promise<Bloco[]>;
    retrieveById(blocoId: number): Promise<Bloco | null>;
    update(bloco: Bloco): Promise<number>;
    delete(blocoId: number): Promise<number>;
    deleteAll(): Promise<number>;
}

class BlocoRepository implements IBlocoRepository {
    async save(bloco: Bloco): Promise<Bloco> {
        try {
            return await Bloco.create({
                nome: bloco.nome,
            })
        } catch (err) {
            throw new Error("Falha ao criar Bloco");
        }
     }

    async retrieveAll(searchParams: { nome?: string; }): Promise<Bloco[]> { 
        try {
            let condition:  any = {};

            if (searchParams?.nome) {
                condition = {
                    ...condition,
                    nome: {
                        [Op.like]: `%${searchParams.nome}%`,
                    },
                };
            }
            
            return await Bloco.findAll({ where: condition });
        } catch (err) {
            throw new Error("Falha ao recuperar Blocos");
        }
    }
    
    async retrieveById(blocoId: number): Promise<Bloco | null> {
        try {
            return await Bloco.findByPk(blocoId);
          } catch (error) {
            throw new Error("Falha ao retornar Bloco!");
          }
     }

    async update(bloco: Bloco): Promise<number> {
        const { id, nome } = bloco;

        try {
            const affectedRows = await Bloco.update(
                { nome },
                { where: {id: id} }
            );

            return affectedRows[0];

        } catch (err) {
            throw new Error("Falha ao atualizar Bloco");
        }
     }

    async delete(blocoId: number): Promise<number> { 
        try {
            const affectedRows = await Bloco.destroy({ where: { id: blocoId } });

            return affectedRows;
        } catch (err) {
            throw new Error("Falha ao deletar Bloco");
        }
    }

    async deleteAll(): Promise<number> { 
        try {
            return await Bloco.destroy({
                where: {},
                truncate: false
            });
        } catch (err) {
            throw new Error("Falha ao deletar Blocos");
        }
    }

}

export default new BlocoRepository();
