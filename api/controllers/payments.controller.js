import { openDB } from "../db.js"

export const getPayments = async (req, res) => {
    try {
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_pagos')
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).json({
                message: 'No se encontraron pagos'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getPayment = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_pagos WHERE pago_id = ?', [id])
        db.end()
        if (rows.length > 0) {
            res.json(rows[0])
        } else {
            res.status(404).json({
                message: 'No se encontraron pagos'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createPayment = async (req, res) => {
    try {
        const { cuenta_id, valor_pagado, fecha_pago } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('INSERT INTO tbl_pagos ( VALUES (?, ?, ?, ?)', [cuenta_id, valor_pagado, fecha_pago])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Pago creado',
                id: result.insertId
            })
        } else {
            res.status(404).json({
                message: 'No se pudo crear el pago'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const updatePayment = async (req, res) => {
    try {
        const { id } = req.params
        const { cuenta_id, valor_pagado, fecha_pago } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('UPDATE tbl_pagos SET cuenta_id = ?, valor_pagado = ?, fecha_pago = ? WHERE pago_id = ?', [cuenta_id, valor_pagado, fecha_pago, id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Pago actualizado'
            })
        } else {
            res.status(404).json({
                message: 'No se pudo actualizar el pago'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [result] = await db.query('DELETE FROM tbl_pagos WHERE pago_id = ?', [id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Pago eliminado'
            })
        } else {
            res.status(404).json({
                message: 'No se pudo eliminar el pago'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Something goes wrong: ${error}`
        })
    }
}