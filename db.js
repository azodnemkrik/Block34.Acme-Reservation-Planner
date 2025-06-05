const pg = require('pg')
const client = new pg.Client('postgres://localhost/acme_reservation_planner')
const { v4 } = require('uuid')
const uuidv4 = v4

// CREATE
const createCustomer = () => {}
const createRestaurant = () => {}
const createReservation = () => {}

// READ
const fetchCustomers = () => {}
const fetchRestaurants = () => {}

// UPDATE

// DELETE
const destroyReservation = () => {}

const seed = async () => {
	const SQL = `
		DROP TABLE IF EXISTS reservations;
		DROP TABLE IF EXISTS customers;
		DROP TABLE IF EXISTS restaurants;

		CREATE TABLE customers(
			id UUID PRIMARY KEY,
			name VARCHAR(100)
		);

		CREATE TABLE restaurants(
			id UUID PRIMARY KEY,
			name VARCHAR(100)
		);
		
		CREATE TABLE reservations(
			id UUID PRIMARY KEY,
			date TIMESTAMP DEFAULT now(),
			party_count INTEGER DEFAULT 1,
			restaurant_id UUID REFERENCES restaurants(id) NOT NULL,
			customer_id UUID REFERENCES customers(id)
		);
	`
	await client.query(SQL)
}

module.exports = {
	seed,
	client,
}