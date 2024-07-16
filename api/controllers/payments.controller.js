import { openDB } from "../db.js"

export const getPayments = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_pagos WHERE credito_id = ?  ORDER BY fecha_pago ASC', [id])

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

export const searchPayments = async (req, res) => {
    try {
        const { fecha } = req.body

        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT C.nombre, A.valor_total, B.valor_pagado, B.fecha_pago, B.estado FROM tbl_creditos AS A LEFT JOIN tbl_pagos AS B ON A.credito_id = B.credito_id INNER JOIN tbl_clientes AS C ON A.cliente_id = C.cliente_id WHERE B.fecha_pago = ?', [fecha])
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).json({
                message: 'No hay cobros para esta fecha'
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
        const arrayPagos = req.body

        const pagosData = arrayPagos.map((data) => {
            return [
                data.credito_id,
                data.valor_pagado,
                data.fecha_pago
            ]
        })
        console.log(pagosData)

        const db = await openDB()
        db.connect()
        const [result] = await db.query('INSERT INTO tbl_pagos (credito_id, valor_pagado, fecha_pago)  VALUES ?', [pagosData])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Pago creado'
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

export const confirmPayment = async (req, res) => {
    try {
        const { id } = req.params
        // const { cuenta_id, valor_pagado, fecha_pago } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('UPDATE tbl_pagos SET estado = 1 WHERE pago_id = ?', [id])
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

export const postponePayment = async (req, res) => {
    try {
        const { id } = req.params
        const { credito_id, valor_pagado } = req.body
        var nuevo_id = Number(id) + 1
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_pagos WHERE pago_id = ? AND credito_id = ?', [nuevo_id, credito_id])

        if (rows.length > 0) {
            var nuevo_pago = Number(valor_pagado) + Number(rows[0].valor_pagado)
            const [result] = await db.query('UPDATE tbl_pagos SET valor_pagado = ? WHERE pago_id = ?', [nuevo_pago, nuevo_id])
            if (result.affectedRows > 0) {
                await db.query('UPDATE tbl_pagos SET valor_pagado = 0.00, estado = 2 WHERE pago_id = ?', [id])
                db.end()
                res.json({
                    message: 'Pago actualizado',
                    nuevoPago: nuevo_pago
                })
            } else {
                db.end()
                res.status(404).json({
                    message: 'No se pudo aplazar el pago'
                })
            }
        } else {
            res.status(404).json({
                message: 'No se encontro el pago'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}