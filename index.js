const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const blocosRouter = require('./routers/blocos');
const dispositivosRouter = require('./routers/dispositivo');
const sensoresDispositivos = require('./routers/sensores');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/blocos', blocosRouter);
app.use('/dispositivos', dispositivosRouter);
app.use('/sensores', sensoresDispositivos);

app.get('/', async (req, res) => {
    res.send('api rodando!');
})

app.listen(port, async () => {
    console.log("Servidor rodando!");
    await sequelize.sync();
    console.log('banco de dados sincronizado!');
})