import { openDB } from "../db.js"

export const getCredits = async (req, res) => {
    try {
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_creditos')
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).json({
                message: 'No se encontraron creditos'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getCredit = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_creditos WHERE credito_id = ?', [id])
        db.end()
        if (rows.length > 0) {
            res.json(rows[0])
        } else {
            res.status(404).json({
                message: 'No se encontro el credito'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getClientCredits = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_creditos WHERE cliente_id = ?', [id])
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).json({
                message: 'El cliente no tiene creditos'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createCredit = async (req, res) => {
    try {
        const { cliente_id, valor_total, fecha_emision, numero_cuotas, periodo_id, interes } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('INSERT INTO tbl_creditos (cliente_id, valor_total, fecha_emision, numero_cuotas, periodo_id, interes) VALUES (?, ?, ?, ?, ?, ?)', [cliente_id, valor_total, fecha_emision, numero_cuotas, periodo_id, interes])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Cliente registrado',
                cliente_id: result.insertId
            })
        } else {
            res.status(404).json({
                message: 'No se pudo crear el credito'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const updateCredit = async (req, res) => {
    try {
        const { id } = req.params
        const { cliente_id, valor_total, fecha_emision, numero_cuotas, periodo_cobro } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('UPDATE tbl_creditos SET cliente_id = ?, valor_total = ?, fecha_emision = ?, numero_cuotas = ?, periodo_cobro = ? WHERE cuenta_id = ?', [cliente_id, valor_total, fecha_emision, numero_cuotas, periodo_cobro, id])
        if (result.affectedRows > 0) {
            res.json({
                message: 'Cuenta actualizada'
            })
        } else {
            res.status(404).json({
                message: 'No se pudo actualizar el credito'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteCredit = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        // const [result] = await db.query('DELETE FROM tbl_creditos WHERE id = ?', [id])
        const [result] = await db.query('UPDATE tbl_creditos SET estado = 0 WHERE credito_id = ?', [id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Cuenta eliminada'
            })
        } else {
            res.status(404).json({
                message: 'No se pudo eliminar el credito'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}