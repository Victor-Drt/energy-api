// src/controllers/bloco.controller.ts
import { Request, Response } from 'express';
import Bloco from '../models/bloco.model';
import blocoRepository from '../repositories/bloco.repository';

export default class BlocoController {
    async create(req: Request, res: Response) {
        try {
            const { nome } = req.body;
            const bloco = await blocoRepository.save(new Bloco({ nome }));
            return res.status(201).json(bloco);
        } catch (error) {
            return res.status(500).json({ message: "Falha ao criar Bloco", error: error });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const { nome } = req.query;
            const blocos = await blocoRepository.retrieveAll({ nome: nome as string });
            return res.status(200).json(blocos);
        } catch (error) {
            return res.status(500).json({ message: "Falha ao recuperar Blocos", error: error });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const bloco = await blocoRepository.retrieveById(Number(id));
            if (bloco) {
                return res.status(200).json(bloco);
            } else {
                return res.status(404).json({ message: "Bloco não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Falha ao retornar Bloco", error: error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            const affectedRows = await blocoRepository.update(new Bloco({ id: Number(id), nome }));
            if (affectedRows > 0) {
                return res.status(200).json({ message: "Bloco atualizado com sucesso" });
            } else {
                return res.status(404).json({ message: "Bloco não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Falha ao atualizar Bloco", error: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const affectedRows = await blocoRepository.delete(Number(id));
            if (affectedRows > 0) {
                return res.status(200).json({ message: "Bloco deletado com sucesso" });
            } else {
                return res.status(404).json({ message: "Bloco não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Falha ao deletar Bloco", error: error });
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            const affectedRows = await blocoRepository.deleteAll();
            return res.status(200).json({ message: `${affectedRows} Bloco(s) deletado(s) com sucesso` });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao deletar Blocos", error: error });
        }
    }
}
