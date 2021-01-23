const e = require("express");
const express = require("express");

const { Register } = require("../../db");

const router = express.Router();

router.get("/registers", async (req, res) => {
    const registers = await Register.findAll();
    res.json(registers);
});

router.get("/registers/:id", async (req, res) => {
    const registers = await Register.findAll();
    const find = registers.some(r => r.id === parseInt(req.params.id));

    if (find) {
        registers.forEach(r => {
            if (r.id === parseInt(req.params.id)) {
                res.json(r);
            }
        });
    } else {
        res.status(404).json({ msg: `Register ${req.params.id} not founded` });
    }
})

router.post("/registers", async (req, res) => {
    await req.body;

    const newRegister = {
        concept: req.body.concept,
        amount: req.body.amount,
        type: req.body.type
    }

    if (!newRegister.concept || !newRegister.amount || !newRegister.type) {
        res.status(400).json({ msg: "Incomplete data" });
    } else {
        Register.create(newRegister);
        res.json(newRegister);
    }
});

router.put("/registers/:id", async (req, res) => {
    const registers = await Register.findAll();
    const find = registers.some(r => r.id === parseInt(req.params.id));

    if (find) {
        const update = req.body;

        registers.forEach(r => {
            if (r.id === parseInt(req.params.id)) {
                r.concept = update.concept ? update.concept : r.concept;
                r.amount = update.amount ? update.concept : r.concept;
                r.type = update.type ? update.type : r.type;
            }
            Register.update(update, {
                where: {
                    id: req.params.id
                }
            });
            res.json(update);
        })
    } else {
        res.status(400).res.json({ msg: `Register with id ${req.params.id} not founded` });
    }
});

router.delete("/registers/:id", async (req, res) => {
    const registers = await Register.findAll();
    const find = registers.some(r => r.id === parseInt(req.params.id));

    if (find) {
        Register.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({ msg: `Register ${req.params.id} deleted` });
    } else {
        res.status(200).json({ msg: `Id ${req.params.id} deleted` })
    }
});

module.exports = router; 