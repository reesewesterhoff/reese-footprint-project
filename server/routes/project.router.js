const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET Projects route 
 */
router.get('/', (req, res) => {
    
});

/**
 * POST Project route
 */
router.post('/', (req, res) => {
    const query = `INSERT INTO "projects" ("name", "country", "user_id";)
    VALUES($1, $2, $3);`;
    pool.query(query, [req.body.name, req.body.country, req.body.user_id
    ]).then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error with project POST to database: ', error);
    })
});

module.exports = router;