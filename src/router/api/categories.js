const express = require("express");

const { Category } = require("../../db");

const router = express.Router();

router.get("/categories", (req, res) => {
    Category.findAll()
        .then(categories => {
            res.json(categories);
        })
        .catch(err => res.json(err));
});

router.get("/categories/:id", (req, res) => {
    if (req.params.id) {
        Category.findOne({
            where: {
                id: parseInt(req.params.id)
            }
        })
            .then(category => {
                res.json(category);
            })
            .catch(err => console.log(err))
    } else {
        res.status(400).json({ msg: "Insert id" })
    }
});

router.post("/categories", (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ msg: "Insert category name" });
    } else {
        Category.create(req.body)
            .then(newCategory => {
                res.json(newCategory);
            })
            .catch(err => res.json(err));
    }
});

router.put("/categories/:id", (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ msg: "Complete form" });
    } else {
        const newCategory = req.body;
        Category.update(newCategory, {
            where: {
                id: parseInt(req.params.id)
            }
        })
            .then(categoryUpdated => {
                res.json(categoryUpdated);
            })
            .catch(err => res.json(err));
    }
});

router.delete("/categories/:id", (req, res) => {
    Category.destroy({
        where: {
            id: parseInt(req.params.id)
        }
    })
        .then(results => {
            res.json(results);
        })
        .catch(err => res.json(err));
});

module.exports = router;