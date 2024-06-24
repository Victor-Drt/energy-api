import { Application } from "express";
import blocoRoutes from "./bloco.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/blocos", blocoRoutes);
    }
}