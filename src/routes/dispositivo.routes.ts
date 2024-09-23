import { Router } from "express";
import DispositivoController from "../controllers/dispositivo.controller";

class DispositivoRoutes {
    router = Router();
    controller = new DispositivoController();

    constructor () {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/', this.controller.create);
        this.router.get('/', this.controller.findAll);
        this.router.get('/bloco/:blocoId', this.controller.findByBloco);
        this.router.get('/:id', this.controller.findOne);
        this.router.put('/:id', this.controller.update);
        this.router.delete('/:id', this.controller.delete);
        this.router.delete('/', this.controller.deleteAll);
    }
}

export default new DispositivoRoutes().router;