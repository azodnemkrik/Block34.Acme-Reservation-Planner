const pg = require('pg')
const client = new pg.Client('postgres://localhost/acme_reservation_planner')   
const {v4} = require('uuid')
const uuidv4 = v4

// CREATE
// READ
// UPDATE
// DELETE