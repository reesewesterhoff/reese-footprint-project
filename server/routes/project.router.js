const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET Projects route 
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `SELECT projects.name, projects.country, projects.id FROM "projects"
    INNER JOIN person ON person.id = projects.user_id
    WHERE person.id = $1;`;
    pool.query(query, [req.user.id])
    // req.user.id
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
router.post('/', rejectUnauthenticated, (req, res) => {
    const query = `INSERT INTO "projects" ("name", "country", "user_id")
    VALUES($1, $2, $3);`;
    pool.query(query, [req.body.projectName, req.body.country, req.user.id
        // use req.user.id 
    ]).then(() => {
        res.sendStatus(201);
    }).catch(error => {
        console.log('Error with project POST to database: ', error);
        res.sendStatus(500)
    })
});

/**
 * GET Project route
 */
router.get('/:id', (req, res) => {
    const query = `SELECT * FROM "projects" WHERE "id" = $1;`
    pool.query(query, [req.params.id ])
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR with GET project:',error);
        res.sendStatus(500);
    })
});

/**
 * GET Sites by Project route
 */
router.get('/sites/:id', (req, res) => {
    const query = `SELECT * FROM "sites" WHERE "project_id" = $1;`
    pool.query(query, [req.params.id ])
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR with GET sites by project:',error);
        res.sendStatus(500);
    })
});

module.exports = router;