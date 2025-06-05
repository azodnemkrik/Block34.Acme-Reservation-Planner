const pg = require('pg')
const client = new pg.Client('postgres://localhost/acme_reservation_planner')
const { v4 } = require('uuid')
const uuidv4 = v4

// CREATE
const createCustomer = async (customer) => {
	const SQL = `
		INSERT INTO customers
		(id , name)
		VALUES
		($1 , $2)
		RETURNING *
	`
	const response = await client.query(SQL , [uuidv4() , customer.name])
}
const createRestaurant = async (restaurant) => {
	const SQL = `
		INSERT INTO restaurants
		(id , name)
		VALUES
		($1 , $2)
		RETURNING *
	`
	const response = await client.query(SQL , [uuidv4() , restaurant.name])
}

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

	const [alan, ander, brooklyn, emerald, leroy] = await Promise.all([
		createCustomer({name: "Alan"}),
		createCustomer({name: "Ander"}),
		createCustomer({name: "Brooklyn"}),
		createCustomer({name: "Emerald"}),
		createCustomer({name: "Leroy"}),
	])

}

module.exports = {
	seed,
	client,
}