const express = require('express');
const { Dispositivo } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
    const dispositivos = await Dispositivo.findAll();
    res.json(dispositivos);
});

router.post('/', async (req, res) => {
    const { name, blocoId } = req.body;
    const dispositivo = await Dispositivo.create({ name, blocoId });
    res.json(dispositivo);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, blocoId } = req.body;
    const dispositivo = await Dispositivo.findByPk(id);
    if (dispositivo) {
        dispositivo.name = name;
        dispositivo.blocoId = blocoId;
        await dispositivo.save();
        res.json(dispositivo);
    } else {
        res.status(404).json({ error: 'Dispositivo não encontrado' });
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const dispositivo = await Dispositivo.findByPk(id);
    if (dispositivo) {
        await dispositivo.destroy();
        res.json({ message: 'Dispositivo deletado' });
    } else {
        res.status(404).json({ message: 'Dispositivo não encontrado' })
    }
});

module.exports = router;