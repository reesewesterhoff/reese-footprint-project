const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET Projects route 
 */
router.get('/', rejectUnauthenticated, (req, res) => {

    const query = `SELECT projects.name, projects.id FROM "projects"

    INNER JOIN person ON person.id = projects.user_id
    WHERE person.id = $1;`; //The user_id is stored in the "projects" table, so we
    //don't need the "person" table in this query
    pool.query(query, [req.user.id])
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
    const query = `INSERT INTO "projects" ("name", "user_id")
    VALUES ($1, $2);`;
    pool.query(query, [req.body.projectName, req.user.id]
    ).then(() => {
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
    const query = `SELECT 
        sites.*, 
        json_agg(json_build_object('size', size, 'unit', unit, 'fuel_cost', fuel_cost)) AS generators 
        FROM "sites" 
        LEFT OUTER JOIN "generator" ON "generator"."site_id"="sites"."id"
        WHERE "project_id" = $1
        GROUP BY sites.id;`
    pool.query(query, [req.params.id])
    .then(results => {
        res.send(results.rows);
    })
    .catch(error => {
        console.log('ERROR with GET sites by project:',error);
        res.sendStatus(500);
    })
});

router.post('/sites', rejectUnauthenticated, (req,res) => {
    const query = `INSERT INTO "sites" ("project_id", "site_name", 
    "site_type_id", "energy_budget", "start_date", "end_date", 
    "latitude", "longitude") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING "sites"."id"`;
    pool.query(query, [req.body.project_id, req.body.state.siteName, req.body.site_type_id,
        req.body.energy_budget, req.body.state.fundStartDate, req.body.state.fundEndDate, 
        req.body.state.location.lat, req.body.state.location.lng]).then((results)=>{
            res.send({site_id: results.rows[0].id});
        }).catch((error) => {
            console.log('Error posting site to project:',error);
            res.sendStatus(500);
        })
})

router.post('/generators/:id', rejectUnauthenticated, (req,res) => {
    const query = `INSERT INTO generator (size, unit, fuel_cost, site_id)
        VALUES ($1, $2, $3, $4)`;
    try{
        for(generator of req.body){
            pool.query(query,[generator.generatorSize,generator.energyUnit,generator.monthlyCost,req.params.id]);
        }
        res.sendStatus(200);
    }catch(error){
        console.log('Error posting generators:',error);
        res.sendStatus(500);
    }
    
})

module.exports = router;