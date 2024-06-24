import { Router } from "express";
import BlocoController from "../controllers/bloco.controller";

class BlocoRoutes {
    router = Router();
    controller = new BlocoController();

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

export default new BlocoRoutes().router;