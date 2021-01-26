const express = require("express");

const { Register } = require("../../db");

const router = express.Router();

router.get("/registers", (req, res) => {

    if (req.query.limit) {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);

        Register.findAndCountAll({
            limit: limit,
            offset: offset
        })
            .then(results => {
                res.json(results);
            })
            .catch(err => console.log(err));
    } else {
        Register.findAll()
            .then(registers => {
                res.json(registers);
            })
            .catch(err => {
                console.log(err);
            })
    }
});

router.get("/registers/:id", (req, res) => {
    if (req.params.id) {
        Register.findOne({
            where: {
                id: parseInt(req.params.id)
            }
        })
            .then(register => {
                res.json(register);
            })
            .catch(err => res.send(err))
    } else {
        res.status(404).json({ msg: `Register ${req.params.id} not founded` });
    }
});

router.post("/registers", (req, res) => {
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

router.put("/registers/:id", (req, res) => {
    if (req.params.id) {
        const update = req.body;

        Register.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(register => {
                register.concept = update.concept ? update.concept : register.concept;
                register.amount = update.amount ? update.concept : register.concept;
                register.type = update.type ? update.type : register.type;

                return update
            })
            .then(registerUpdated => {
                Register.update(registerUpdated, {
                    where: {
                        id: req.params.id
                    }
                });
                res.json(update);
            });
    } else {
        res.status(400).res.json({ msg: `Register with id ${req.params.id} not founded` });
    }
});

router.delete("/registers/:id", (req, res) => {
    if (req.params.id) {
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