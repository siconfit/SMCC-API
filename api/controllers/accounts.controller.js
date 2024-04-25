import { openDB } from "../db.js"

export const getAccounts = async (req, res) => {
    try {
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_cuentas')
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).json({
                message: 'No se encontraron cuentas'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getAccount = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_cuentas WHERE cuenta_id = ?', [id])
        db.end()
        if (rows.length > 0) {
            res.json(rows[0])
        } else {
            res.status(404).json({
                message: 'No se encontro la cuenta'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createAccount = async (req, res) => {
    try {
        const { cliente_id, valor_total, fecha_emision, duracion_dias, periodo_cobro } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('INSERT INTO tbl_cuentas (cliente_id, valor_total, fecha_emision, duracion_dias, periodo_cobro) VALUES (?, ?, ?, ?, ?)', [cliente_id, valor_total, fecha_emision, duracion_dias, periodo_cobro])
        db.end()
        if (result.affectedRows > 0) {
            res.json(rows)
        } else {
            res.status(404).json({
                message: 'No se pudo crear la cuenta'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const updateAccount = async (req, res) => {
    try {
        const { id } = req.params
        const { cliente_id, valor_total, fecha_emision, duracion_dias, periodo_cobro } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('UPDATE tbl_cuentas SET cliente_id = ?, valor_total = ?, fecha_emision = ?, duracion_dias = ?, periodo_cobro = ? WHERE cuenta_id = ?', [cliente_id, valor_total, fecha_emision, duracion_dias, periodo_cobro, id])
        if (result.affectedRows > 0) {
            res.json({
                message: 'Cuenta actualizada'
            })
        } else {
            res.status(404).json({
                message: 'No se pudo actualizar la cuenta'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        // const [result] = await db.query('DELETE FROM tbl_cuentas WHERE id = ?', [id])
        const [result] = await db.query('UPDATE tbl_cuentas SET estado = 0 WHERE cuenta_id = ?', [id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Cuenta eliminada'
            })
        } else { 
            res.status(404).json({
                message: 'No se pudo eliminar la cuenta'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}