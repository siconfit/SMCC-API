import { openDB } from "../db.js"

export const getClients = async (req, res) => {
    try {
        const db = await openDB()
        db.connect()
        const [rows, fields] = await db.query('SELECT * FROM tbl_clientes')
        db.end()
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getClient = (req, res) => {
    const { id } = req.params
    res.send(`Obteniendo cliente ${id}`)
}

export const createClient = (req, res) => {
    res.send('Insertando cliente')
}

export const updateClient = (req, res) => {
    res.send('Actualizando cliente')
}

export const deleteClient = (req, res) => {
    res.send('Eliminando cliente')
}