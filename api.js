const express = require('express')
const app = express.Router()
const {
	fetchCustomers,
	createReservation,
} = require('./db.js')

// CREATE
	// Customer
	// Restaurant
	// Reservation
app.post('/reservations' , async (req,res,next) => {
	try {
		res.send(await createReservation())
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
	// Reservation
app.get()

// UPDATE
app.put()

// DELETE
app.delete()
	// Reservation

// module.exports = app