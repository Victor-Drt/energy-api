const express = require('express');
const { Bloco } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
    const blocos = await Bloco.findAll();
    res.json(blocos);
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    const bloco = await Bloco.create({ name });
    res.json(bloco);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const bloco = await Bloco.findByPk(id);
    if (bloco) {
        bloco.name = name;
        await bloco.save();
        res.json(bloco);
    } else {
        res.status(404).json({ error: 'Bloco não encontrado' });
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const bloco = await Bloco.findByPk(id);
    if (bloco) {
        await bloco.destroy();
        res.json({ message: 'Bloco deletado' });
    } else {
        res.status(404).json({ message: 'Bloco não encontrado' })
    }
});

module.exports = router;