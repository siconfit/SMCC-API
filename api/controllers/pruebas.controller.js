import { openDB } from "../db.js"

export const getPruebas = async (req, res) => {
    try {
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_pruebas')
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(400).send('No existen registros')
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
}

export const getPrueba = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_pruebas WHERE pru_id = ?', [id])
        db.end()
        if (rows.length > 0) {
            res.json(rows[0])
        } else {
            res.status(400).send('No existe registro')
        }

    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
}

export const createPrueba = async (req, res) => {
    try {
        const { prueba_nombre } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('INSERT INTO tbl_pruebas (pru_nombre) VALUES (?)', [prueba_nombre])
        db.end()
        if (result.affectedRows > 0) {
            res.send('Prueba registrada')
        } else {
            res.send('Error en el registro')
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
}

export const updatePrueba = async (req, res) => {
    try {
        const { id } = req.params
        const { prueba_nuevo_nombre } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('UPDATE tbl_pruebas SET pru_nombre = ? WHERE pru_id = ?', [prueba_nuevo_nombre, id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: "Prueba actualizada"
            })
        } else {
            res.status(400).json({
                message: "Error en la actualización"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
}

export const deletePrueba = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        // const [result] = await db.query('DELETE FROM tbl_pruebas WHERE pru_id = ?', [id])
        const [result] = await db.query('UPDATE tbl_pruebas SET pru_estado = 0 WHERE pru_id = ?', [id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: "Prueba eliminada"
            })
        } else {
            res.status(400).json({
                message: "Error en la eliminación"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something goes wrong"
        })
    }
}