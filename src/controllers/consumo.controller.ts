import { Request, Response } from 'express';
import Consumo from '../models/consumo.model';
import consumoRepository from '../repositories/consumo.repository';

export default class ConsumoController {
    async create(req: Request, res: Response) {
        try {
            const { valor, dispositivoId } = req.body;
            const consumo = await consumoRepository.save(new Consumo({ valor, dispositivoId }));
            return res.status(201).json(consumo);
        } catch (error) {
            return res.status(500).json({ message: "Falha ao criar consumo", error: error });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const { valor, dispositivoId } = req.query;
            const consumos = await consumoRepository.retrieveAll({ dispositivoId: Number(dispositivoId)});
            return res.status(200).json(consumos);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Falha ao recuperar consumos", error: error });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const consumo = await consumoRepository.retrieveById(Number(id));
            if (consumo) {
                return res.status(200).json(consumo);
            } else {
                return res.status(404).json({ message: "consumo não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Falha ao retornar consumo", error: error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { valor, dispositivoId } = req.body;
            const affectedRows = await consumoRepository.update(new Consumo({ id: Number(id), valor, dispositivoId }));
            if (affectedRows > 0) {
                return res.status(200).json({ message: "consumo atualizado com sucesso" });
            } else {
                return res.status(404).json({ message: "consumo não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Falha ao atualizar consumo", error: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const affectedRows = await consumoRepository.delete(Number(id));
            if (affectedRows > 0) {
                return res.status(200).json({ message: "consumo deletado com sucesso" });
            } else {
                return res.status(404).json({ message: "consumo não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Falha ao deletar consumo", error: error });
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            const affectedRows = await consumoRepository.deleteAll();
            return res.status(200).json({ message: `${affectedRows} consumo(s) deletado(s) com sucesso` });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao deletar consumos", error: error });
        }
    }
}
