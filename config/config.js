const dotenv = require("dotenv")
dotenv.config();
module.exports={
	"development": {
		"username": process.env.PG_USER,
		"password": process.env.PG_PASSWORD,
		"database": process.env.PG_DATABASE,
		"host": process.env.PG_HOST,
		"dialect": postgres
	},
	"test": {
		"username": process.env.PG_USER,
		"password": process.env.PG_PASSWORD,
		"database": process.env.PG_DATABASE,
		"host": process.env.PG_HOST,
		"dialect": postgres
	},
	"production": {
		"username": process.env.PG_USER,
		"password": process.env.PG_PASSWORD,
		"database": process.env.PG_DATABASE,
		"host": process.env.PG_HOST,
		"dialect": postgres,
		"use_env_variable": "DATABASE_URL",
		dialectOptions: {
		  ssl: {
			require: true,
			rejectUnauthorized: false,
		  },
		},
	}
}
