const { Client } = require('pg')

const client = new Client({
  database: 'luxury'
})
client.connect()

async function CreateUser (user) {
  return client.query(
    `INSERT INTO public."user"(
    name, phone, email, phash)
    VALUES ($1, $2, $3, $4)`,
    [user.name, user.phone, user.email, user.phash]).rows
}

async function GetUser (user) {
  return client.query(
    `SELECT id, name, phone, email, phash
    FROM public."user"
    WHERE phone=$1`,
    [user.phone]).rows
}
module.exports = { CreateUser, GetUser }
