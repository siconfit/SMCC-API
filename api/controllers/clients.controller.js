import { openDB } from "../db.js"

export const getClients = async (req, res) => {
    try {
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_clientes')
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(400).json({
                message: 'No se encontraron clientes'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getClient = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_clientes WHERE cliente_id = ?', [id])
        db.end()
        if (rows.length > 0) {
            res.json(rows[0])
        } else {
            res.status(400).json({
                message: 'No se encontro al cliente'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createClient = async (req, res) => {
    try {
        const { cuenta_principal_id, nombre, cedula, telefono, direccion } = req.body

        const db = await openDB()
        db.connect()

        const [result] = await db.query('INSERT INTO tbl_clientes (cuenta_principal_id, nombre, cedula, telefono, direccion) VALUES (?, ?, ?, ?, ?)', [cuenta_principal_id, nombre, cedula, telefono, direccion])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Cliente registrado',
                cliente_id: result.insertId
            })
        } else {
            db.end()
            res.status(400).json({
                message: 'No se pudo registrar el cliente'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const updateClient = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, cedula, direccion, telefono } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('UPDATE tbl_clientes SET nombre = ?, cedula = ?, direccion = ?, telefono = ? WHERE cliente_id = ?', [nombre, cedula, direccion, telefono, id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Cliente actualizado'
            })
        } else {
            res.status(400).json({
                message: 'No se pudo actualizar el cliente'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        // const [result] = await db.query('DELETE FROM tbl_clientes WHERE cliente_id = ?', [id])
        const [result] = await db.query('UPDATE tbl_clientes SET estado = 0 WHERE cliente_id = ?', [id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Cliente eliminado'
            })
        } else {
            res.status(400).json({
                message: 'No se pudo eliminar el cliente'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}