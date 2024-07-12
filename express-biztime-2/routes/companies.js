const express = require("express");
const slugify = require("slugify");
const ExpressError = require("../expressError");
const db = require("../db")

let router = new express.Router();

router.get("/", async function (req, res, next) {
    try {
        const result = await db.query(
            `SELECT code, name
            FROM companies
            ORDER BY name`
        );
        return res.json({"companies": result.rows})
    }
    catch (err) {
        return next(err)
    }
});

router.get("/:code", async (req, res, next) => {
    try {
        const result = await db.query(
            `SELECT *
            FROM companies
            WHERE code = $1`,
            [req.params.code]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ "error": "Company not found" });
        }
        return res.json({"company": result.rows})
    } catch (err) {
        return next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        let { code, name , description } = req.body;
        name = slugify(name, {
            lower: true,
            remove: /[*+~.()'"!:@]/g
        })
        const result = await db.query(
            `INSERT INTO companies (code, name, description)
            VALUES ($1, $2, $3)
            RETURNING code, name, description`,
            [code, name, description]
        )
        return res.status(201).json({"company": result.rows[0]})
    }catch (err) {
        return next(err)
    }
})

router.put("/:code", async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const result = await db.query(
            `UPDATE companies
            SET name = $1, description = $2
            WHERE code = $3
            RETURNING code, name, description`,
            [name, description, req.params.code]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ "error": "Company not found" });
        }
        return res.json({"company": result.rows[0]})
    } catch (err) {
        return next(err)
    }
})

router.delete("/:code", async (req, res, next) => {
    try {
        const result = await db.query(
            `DELETE FROM companies
            WHERE code = $1`,
            [req.params.code]
        )
        return res.json({"status": "deleted"})
    } catch (err) {
        return next(err)
    }
})

module.exports = router;