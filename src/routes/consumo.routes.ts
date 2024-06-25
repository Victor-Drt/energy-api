import { Router } from "express";
import ConsumoController from "../controllers/consumo.controller";

class ConsumoRoutes {
    router = Router();
    controller = new ConsumoController();

    constructor () {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/', this.controller.create);
        this.router.get('/', this.controller.findAll);
        this.router.get('/:id', this.controller.findOne);
        this.router.put('/:id', this.controller.update);
        this.router.delete('/:id', this.controller.delete);
        this.router.delete('/', this.controller.deleteAll);
    }
}

export default new ConsumoRoutes().router;