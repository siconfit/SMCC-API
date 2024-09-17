import { openDB } from "../db.js"

export const verifySubscription = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT estado FROM tbl_cuentas_principal WHERE cuenta_principal_id = ?', [id])
        db.end()
        const user = rows[0]
        res.json(user)
    } catch (error) {

    }
}

export const mainAuth = async (req, res) => {
    try {
        const { usuario } = req.body
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_cuentas_principal WHERE usuario = ?', [usuario])
        db.end()
        if (rows.length > 0) {
            const user = rows[0]
            res.json(user)
        } else {
            res.status(404).json({
                message: 'Ninguna empresa esta asociada a este usuario'
            })
        }
    } catch (error) {

    }
}

export const secondaryAuth = async (req, res) => {
    try {
        const { usuario, contrasena } = req.body
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT cuenta_secundaria_id, cuenta_principal_id, nombre, cedula, telefono, rol, estado FROM tbl_cuentas_secundaria WHERE usuario = ? && contrasena = ?', [usuario, contrasena])
        db.end()
        if (rows.length > 0) {
            const user = rows[0]
            res.json(user)
        } else {
            res.status(404).json({
                message: 'Usuario y/o contraseña incorrecto'
            })
        }
    } catch (error) {

    }
}

export const getMain = async (req, res) => {
    try {
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_cuentas_principal')
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).json({
                message: 'No se encontraron cuentas principales'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getSecondary = async (req, res) => {
    try {
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_cuentas_secundaria')
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).json({
                message: 'No se encontraron cuentas secundarias'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}