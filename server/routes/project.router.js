const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET Projects route 
 */
router.get('/:id', (req, res) => {
    const query = `SELECT projects.name, projects.country FROM "projects"
    INNER JOIN person ON person.id = projects.user_id
    WHERE person.id = $1;`;
    pool.query(query, [req.params.id])
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR with GET projects:',error);
        res.sendStatus(500);
    })
});

/**
 * POST Project route
 */
router.post('/', (req, res) => {
    const query = `INSERT INTO "projects" ("name", "country", "user_id")
    VALUES($1, $2, $3);`;
    pool.query(query, [req.body.projectName, req.body.country, req.body.user_id
    ]).then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error with project POST to database: ', error);
    })
});

module.exports = router;