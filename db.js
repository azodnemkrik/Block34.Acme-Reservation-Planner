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
	return response.rows[0]
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
	console.log("response.rows:", response.rows[0])
	return response.rows[0]
}

const createReservation = async (reservation) => {
	const SQL = `
		INSERT INTO reservations
		(id, date, party_count , restaurant_id , customer_id)
		VALUES
		($1 ,now(), $2 , $3 , $4 )
		RETURNING *
	`
	const response = await client.query(SQL, [uuidv4(), reservation.party_count , reservation.restaurant_id , reservation.customer_id])
	return response.rows[0]
}

// READ
const fetchCustomers = async () => {
	const SQL = `
		SELECT *
		FROM customers
	`
	const response = await client.query(SQL)
	return response.rows
}

const fetchRestaurants = async () => {
	const SQL = `
		SELECT *
		FROM restaurants
	`
	const response = await client.query(SQL)
	return response.rows
}

const fetchReservations = async () => {
	const SQL = `
		SELECT *
		FROM reservations
	`
	const response = await client.query(SQL)
	return response.rows
}
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
			party_count INTEGER DEFAULT 1 NOT NULL,
			restaurant_id UUID REFERENCES restaurants(id) NOT NULL,
			customer_id UUID REFERENCES customers(id) NOT NULL
		);
	`
	await client.query(SQL)

	const [alan, ander, brooklyn, emerald, leroy, aviana, brian, kasen, ford, clarke] = await Promise.all([
		createCustomer({name: "Alan"}),
		createCustomer({name: "Ander"}),
		createCustomer({name: "Brooklyn"}),
		createCustomer({name: "Emerald"}),
		createCustomer({name: "Leroy"}),
		createCustomer({name: "Aviana"}),
		createCustomer({name: "Brian"}),
		createCustomer({name: "Kasen"}),
		createCustomer({name: "Ford"}),
		createCustomer({name: "Clarke"}),
	])

	const [jadeFarmer, orangeChicken, hotHeart, ambiance, laSalutation] = await Promise.all([
		createRestaurant({name: "Jade Farmer"}),
		createRestaurant({name: "The Orange Chicken"}),
		createRestaurant({name: "Hot Heart"}),
		createRestaurant({name: "Ambiance"}),
		createRestaurant({name: "la Salutation"}),
	])


	await Promise.all([
		 createReservation({party_count: 3 , restaurant_id: jadeFarmer.id , customer_id:ford.id})
	])

}

module.exports = {
	seed,
	client,
	fetchCustomers,
	fetchRestaurants,
	fetchReservations,
	createReservation,
	createRestaurant
}