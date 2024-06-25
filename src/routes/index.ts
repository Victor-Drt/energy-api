import { Application } from "express";
import blocoRoutes from "./bloco.routes";
import dispositivoRoutes from "./dispositivo.routes";

export default class Routes {
    constructor(app: Application) {
        app.use("/blocos", blocoRoutes);
        app.use("/dispositivos", dispositivoRoutes);
    }
}