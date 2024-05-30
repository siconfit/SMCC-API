import { openDB } from "../db.js"

export const getRelations = async (req, res) => {
    try {
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_clientes_usuarios')
        db.end()
        if (rows.length > 0) {
            res.json(rows)
        } else {
            res.status(404).json({
                message: 'No se encotraron relaciones'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getRelation = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_clientes_usuarios WHERE cliente_usuario_id = ?', [id])
        db.end()
        if (rows.length > 0) {
            res.json(rows[0])
        } else {
            res.status(404).json({
                message: 'No se encotro la relacion'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getRelationsUser = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        const [rows] = await db.query('SELECT * FROM tbl_clientes_usuarios WHERE cuenta_secundaria_id = ?', [id])
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
        const { cliente_id, usuario_id } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('INSERT INTO tbl_clientes_usuarios (cliente_id, usuario_id) VALUES (?, ?)', [cliente_id, usuario_id])
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

export const updateRelation = async (req, res) => {
    try {
        const { id } = req.params
        const { cliente_id, usuario_id } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('UPDATE tbl_clientes_usuarios SET cliente_id = ?, usuario_id = ? WHERE cliente_usuario_id = ?', [cliente_id, usuario_id, id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Relacion actualizada correctamente'
            })
        } else {
            res.status(404).json({
                message: 'No se pudo actualizar la relacion'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteRelation = async (req, res) => {
    try {
        const { id } = req.params
        const db = await openDB()
        db.connect()
        // const [result] = await db.query('DELETE FROM tbl_clientes_usuarios WHERE cliente_usuario_id = ?', [id])
        const [result] = await db.query('UPDATE tbl_clientes_usuarios SET estado = 0 WHERE cliente_usuario_id = ?', [id])
        db.end()
        if (result.affectedRows > 0) {
            res.json({
                message: 'Relacion eliminada correctamente'
            })
        } else {
            res.json({
                message: 'No se pudo eliminar la relacion'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}