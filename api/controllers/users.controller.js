import { openDB } from "../db.js"

export const getUsers = async (req, res) => {
    const db = await openDB()
    db.connect()
    const [rows, fields] = await db.query('SELECT * FROM tbl_clientes')
    db.end()
    res.json(rows)
}

export const getUser = (req, res) => {
    res.send('Obteniendo usuario')
}