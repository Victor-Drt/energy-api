const express = require('express');
const { Sensor } = require('../models');
const router = express.Router();

// Obter todos os sensores
router.get('/', async (req, res) => {
    const sensores = await Sensor.findAll();
    res.json(sensores);
});

// Criar um novo sensor
router.post('/', async (req, res) => {
    const { name, corrente, dataHora, dispositivoId } = req.body;
    const sensor = await Sensor.create({ name, corrente, dataHora, dispositivoId });
    res.json(sensor);
});

// Atualizar um sensor
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, corrente, dataHora, dispositivoId } = req.body;
    const sensor = await Sensor.findByPk(id);
    if (sensor) {
        sensor.name = name;
        sensor.corrente = corrente;
        sensor.dataHora = dataHora;
        sensor.dispositivoId = dispositivoId;
        await sensor.save();
        res.json(sensor);
    } else {
        res.status(404).json({ error: 'Sensor not found' });
    }
});

// Deletar um sensor
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const sensor = await Sensor.findByPk(id);
    if (sensor) {
        await sensor.destroy();
        res.json({ message: 'Sensor deleted' });
    } else {
        res.status(404).json({ error: 'Sensor not found' });
    }
});

module.exports = router;
