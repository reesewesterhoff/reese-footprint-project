// server/routes/site.types.router.js

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:category', (req, res) => {
    console.log('req.params.category', req.params.category);
    
    pool.query(`SELECT * FROM "site_type" WHERE "category"=$1;`, [req.params.category])
    .then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting site types', error);
        res.sendStatus(500);
    });
});

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('req.params.category', req.params.category);
    
    pool.query(`SELECT * FROM "site_type";`)
    .then(results => {
        res.send(results.rows);
    }).catch(error => {
        console.log('Error getting site types', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;