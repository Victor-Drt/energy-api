import { Request, Response } from 'express';
import Dispositivo from '../models/dispositivo.model';
import dispositivoRepository from '../repositories/dispositivo.repository';

export default class DispositivoController {
    async create(req: Request, res: Response) {
        try {
            const { nome, blocoId } = req.body;
            const dispositivo = await dispositivoRepository.save(new Dispositivo({ nome, blocoId }));
            return res.status(201).json(dispositivo);
        } catch (error) {
            return res.status(500).json({ message: "Falha ao criar dispositivo", error: error });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const { nome, blocoId } = req.query;
            const dispositivos = await dispositivoRepository.retrieveAll({ nome: nome as string });
            return res.status(200).json(dispositivos);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Falha ao recuperar dispositivos", error: error });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const dispositivo = await dispositivoRepository.retrieveById(Number(id));
            if (dispositivo) {
                return res.status(200).json(dispositivo);
            } else {
                return res.status(404).json({ message: "dispositivo não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Falha ao retornar dispositivo", error: error });
        }
    }

    async findByBloco(req: Request, res: Response) {
        try {
            const { blocoId } = req.params;
            const dispositivos = await dispositivoRepository.retrieveByBlocoId(Number(blocoId));
            
            if (dispositivos.length > 0) {
                return res.status(200).json(dispositivos);
            } else {
                return res.status(404).json({ message: "Nenhum dispositivo encontrado para este bloco" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Falha ao recuperar dispositivos do bloco", error: error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, blocoId } = req.body;
            const affectedRows = await dispositivoRepository.update(new Dispositivo({ id: Number(id), nome, blocoId }));
            if (affectedRows > 0) {
                return res.status(200).json({ message: "dispositivo atualizado com sucesso" });
            } else {
                return res.status(404).json({ message: "dispositivo não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Falha ao atualizar dispositivo", error: error });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const affectedRows = await dispositivoRepository.delete(Number(id));
            if (affectedRows > 0) {
                return res.status(200).json({ message: "dispositivo deletado com sucesso" });
            } else {
                return res.status(404).json({ message: "dispositivo não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Falha ao deletar dispositivo", error: error });
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            const affectedRows = await dispositivoRepository.deleteAll();
            return res.status(200).json({ message: `${affectedRows} dispositivo(s) deletado(s) com sucesso` });
        } catch (error) {
            return res.status(500).json({ message: "Falha ao deletar dispositivos", error: error });
        }
    }
}
