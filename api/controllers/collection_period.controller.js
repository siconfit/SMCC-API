import { openDB } from "../db.js"

export const getPeriods = async (req, res) => {
    try {
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_periodo_cobro WHERE estado = 1')
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).json({
                message: 'No se encontraron periodos de cobro'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getPeriod = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_periodo_cobro WHERE periodo_id = ?', [id])
        db.end()
        if (rows.length > 0) {
            res.json(rows[0])
        } else {
            res.status(404).json({
                message: 'No se encontro el periodo de cobro'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createPeriod = async (req, res) => {
    try {
        const { nombre, intervalo, fin_semana } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('INSERT INTO tbl_periodo_cobro (nombre, intervalo, fin_semana) VALUES (?, ?, ?)', [nombre, intervalo, fin_semana])
        db.end()
        if (result.affectedRows > 0) {
            res.json({ message: 'Periodo de cobro creado con exito' })
        } else {
            res.status(404).json({ message: 'Error al crear el periodo de cobro!' })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const updatePeriod = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, intervalo, fin_semana } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('UPDATE tbl_periodo_cobro SET nombre = ?, intervalo = ?, fin_semana = ? WHERE periodo_id = ?', [nombre, intervalo, fin_semana, id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Periodo de cobro actualizado correctamente'
            })
        } else {
            res.status(404).json({
                message: 'No se pudo actualizar el periodo cobro'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deletePeriod = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [result] = await db.query('UPDATE tbl_periodo_cobro SET estado = 0 WHERE periodo_id = ?', [id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Perioddo de cobro eliminado correctamente'
            })
        } else {
            res.status(404).json({
                message: 'No se pudo eliminar el periodo de cobro'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}