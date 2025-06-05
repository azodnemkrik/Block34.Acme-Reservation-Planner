const express = require('express')
const app = express.Router()
const {
	fetchCustomers,
	fetchRestaurants,
	createReservation,
} = require('./db.js')

// CREATE
// Customer
// Restaurant
// Reservation
app.post('/reservations', async (req, res, next) => {
	try {
		res.send(await createReservation(req.body))
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

// UPDATE

// DELETE
// Reservation

module.exports = app