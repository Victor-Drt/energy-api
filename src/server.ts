import express, { Application } from "express";
import Server from "./index";

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = 3000;

app.listen(
    PORT, "localhost", function() {
        console.log(`Servidor rodando na porta ${PORT}.`);
    })
    .on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
            console.log("Error: endereço já em uso!");
        } else {
            console.log(err);
        }
    })