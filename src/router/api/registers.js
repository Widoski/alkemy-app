const express = require("express");

const { Register } = require("../../db");

const router = express.Router();

router.get("/registers", (req, res) => {
    if (req.query.type) {
        Register.findAndCountAll({
            where: {
                type: req.query.type,
            },
            limit: parseInt(req.query.limit) || null,
            offset: parseInt(req.query.offset) || 0,
        })
            .then(registers => {
                res.json(registers);
            })
            .catch(err => res.json(err));
    } else {
        Register.findAndCountAll({
            limit: parseInt(req.query.limit) || null,
            offset: parseInt(req.query.offset) || 0,
        })
            .then(registers => {
                res.json(registers);
            })
            .catch(err => res.json(err));
    }
});

router.get("/registers/:id", (req, res) => {
    if (req.params.id) {
        Register.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(register => {
                res.json(register);
            })
            .catch(err => res.status(404).json({ msg: "Register not founded" }));
    } else {
        res.status(400).json({ msg: "Insert id" });
    }
});

router.get("/registers/category/:CategoryId", (req, res) => {
    if (req.params.CategoryId) {
        Register.findAll({
            where: {
                CategoryId: req.params.CategoryId
            }
        })
            .then(register => {
                res.json(register);
            })
            .catch(err => res.json(err));
    } else {
        res.status(400).json({ msg: "Please insert id" });
    }
});

router.post("/registers", (req, res) => {
    if (!req.body.concept || !req.body.amount || !req.body.type || !req.body.CategoryId) {
        res.status(400).json({ msg: "Incomplete data" });
    } else {
        const { concept, amount, type, CategoryId } = req.body;
        const newRegister = { concept, amount, type, CategoryId };

        Register.create(newRegister)
            .then(result => {
                res.json(result);
            })
            .catch(err => res.json(err));
    }
});

router.put("/registers/:id", (req, res) => {
    if (!req.body.concept || !req.body.amount || !req.body.type) {
        res.status(400).res.json({ msg: "Please, complete all forms" });
    } else {
        const newRegister = req.body;
        Register.update(newRegister, {
            where: {
                id: req.params.id
            }
        })
            .then(registerUpdated => {
                res.json(registerUpdated);
            })
            .catch(err => res.json(err));
    }
});

router.delete("/registers/:id", (req, res) => {
    if (req.params.id) {
        Register.destroy({
            where: {
                id: parseInt(req.params.id)
            }
        })
            .then(result => {
                res.json({ msg: `Register ${req.params.id} deleted` });
            })
            .catch(err => console.log(err))
    } else {
        res.status(400).json({ msg: "Insert id" })
    }
});

module.exports = router; 