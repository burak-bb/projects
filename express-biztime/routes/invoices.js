const express = require("express");
const slugify = require("slugify");
const ExpressError = require("../expressError");
const db = require("../db")

let router = new express.Router();

router.get("/", async (req, res, next) => {
    try {
        const result = await db.query(
            `SELECT id, comp_code
            FROM invoices`
        )
        return res.json({"invoices": result.rows})
    } catch (err) {
        next(err)
    }
})


router.get("/:id", async (req, res, next) => {
    try {
        const result = await db.query(
            `SELECT i.id, i.amt, i.paid, i.add_date, i.paid_date,
                c.code AS company_code, c.name AS company_name, c.description AS company_description
            FROM invoices AS i
            JOIN companies AS c ON i.comp_code = c.code
            WHERE id = $1`,
            [req.params.id]
        )
        return res.json({"invoice": result.rows})
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { comp_code, amt} = req.body;
        const result = await db.query(
            `INSERT INTO invoices (comp_code, amt)
            VALUES ($1, $2)
            RETURNING id, comp_code, amt, paid, add_date, paid_date`,
            [comp_code, amt]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({"error": "invoice cannot be found"})
        }
        return res.json({"invoice": result.rows[0]})
    } catch (err) {
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const { amt} = req.body;
        const result = await db.query(
            `UPDATE invoices
            SET amt = $1
            WHERE id = $2
            RETURNING id, comp_code, amt, paid, add_date, paid_date`,
            [amt, req.params.id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({"error": "invoice not found"})
        }
        return res.json({"invoice": result.rows[0]})
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const result = await db.query(
            `DELETE FROM invoices
            WHERE id = $1`,
            [req.params.id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({"error": "invoice not found"})
        }
        return res.json({"status": "deleted"})
    } catch (err) {
        next(err)
    }
})
module.exports = router;