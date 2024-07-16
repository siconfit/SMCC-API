import { openDB } from "../db.js"

export const getRelationsUser = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_clientes_usuarios INNER JOIN tbl_clientes ON tbl_clientes_usuarios.cliente_id = tbl_clientes.cliente_id WHERE cuenta_secundaria_id = ?', [id])
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).json({
                message: 'No se encotro clientes para este usuario'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createRelation = async (req, res) => {
    try {
        const { cliente_id, cuenta_secundaria_id } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('INSERT INTO tbl_clientes_usuarios (cliente_id, cuenta_secundaria_id) VALUES (?, ?)', [cliente_id, cuenta_secundaria_id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Cliente vinculado'
            })
        } else {
            res.status(404).json({
                message: 'No se pudo vincular al cliente'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}