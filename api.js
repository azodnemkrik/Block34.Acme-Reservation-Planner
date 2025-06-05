const express = require('express')
const app = express.Router()
const {
	fetchCustomers,
	fetchRestaurants,
	fetchReservations,
	createReservation,
} = require('./db.js')

// CREATE
// Customer
// Restaurant
// Reservation
app.post('/customers/:id/reservations', async (req, res, next) => {
	try {
		res.send(await createReservation(req.body.party_count , req.body.restaurant_id , req.params.id ))
	} catch (error) {
		next(error)
	}
})


// READ
// Customer
app.get('/customers' , async (req,res,next) => {
    try {
        res.send(await fetchCustomers())
    } catch (error) {
        next(error)
    }
})

// Restaurant
app.get('/restaurants', async (req, res, next) => {
	try {
		res.send(await fetchRestaurants())
	} catch (error) {
		next(error)
	}
})
// Reservation
app.get('/reservations', async (req, res, next) => {
	try {
		res.send(await fetchReservations())
	} catch (error) {
		next(error)
	}
})

// UPDATE

// DELETE
// Reservation

module.exports = app