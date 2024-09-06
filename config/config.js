import mysql from 'mysql2/promise'
import {config} from 'dotenv'

config()

const pool = mysql.createPool({
host: process.env.hostDb,
user: process.env.userDb,
password: process.env.pwDb,
database: process.env.dbName
})

export {pool}