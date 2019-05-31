const { Client } = require('pg')

const client = new Client({
  database: 'luxury'
})
client.connect()

async function CreateUser (user) {
  return client.query(
    `INSERT INTO public."user"(
    name, phone, email, phash)
    VALUES ($1, $2, $3, $4)
    RETURNING id`,
    [user.name, user.phone, user.email, user.phash])
}

async function GetUserByPhone (phone) {
  return client.query(
    `SELECT id, name, phone, email, phash
    FROM public."user"
    WHERE phone=$1`,
    [phone])
}
module.exports = { CreateUser, GetUserByPhone }
