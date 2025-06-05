const express = require('express')
const app = express()

app.use(express.json())

const init = () => {
	const PORT = 3000
	app.listen(PORT, () => {
		console.log(`Listening to PORT: ${PORT}`)
	})
}

init()