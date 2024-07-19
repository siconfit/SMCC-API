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

export const createMain = async (req, res) => {
    try {
        const { usuario, nombre_empresa } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('INSERT INTO tbl_cuentas_principal (usuario, nombre_empresa) VALUES (?, ?)', [usuario, nombre_empresa])
        db.end()
        if (result.affectedRows > 0) {
            res.json({ message: 'Empresa creada con exito!' })
        } else {
            res.status(404).json({ message: 'Error al crear la empresa!' })
        }
    } catch (error) {

    }
}

export const createSecondary = async (req, res) => {
    try {
        const { cuenta_principal_id, usuario, contrasena, nombre, cedula, telefono, rol } = req.body
        const db = await openDB()
        db.connect()
        const [result] = await db.query('INSERT INTO tbl_cuentas_secundaria (cuenta_principal_id, usuario, contrasena, nombre, cedula, telefono, rol) VALUES (?, ?, ?, ?, ?, ?, ?)', [cuenta_principal_id, usuario, contrasena, nombre, cedula, telefono, rol])
        db.end()
        if (result.affectedRows > 0) {
            res.json({ message: 'Usuario creado con exito!' })
        } else {
            res.status(404).json({ message: 'Error al crear el usuario!' })
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

// export const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params
//         const { nombre, cedula, nickname, contrasena } = req.body
//         const db = await openDB()
//         db.connect()
//         const [result] = await db.query('UPDATE tbl_usuarios SET nombre = ?, cedula = ?, nickname = ?, contrasena = ? WHERE usuario_id = ?', [nombre, cedula, nickname, contrasena, id])
//         db.end()
//         if (result.affectedRows > 0) {
//             res.json({
//                 message: 'Usuario actualizado correctamente'
//             })
//         } else {
//             res.status(404).json({
//                 message: 'No se pudo actualizar el usuario'
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Something goes wrong'
//         })
//     }
// }

// export const deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params
//         const db = await openDB()
//         db.connect()
//         // const [result] = await db.query('DELETE FROM tbl_usuarios WHERE usuario_id = ?', [id])
//         const [result] = await db.query('UPDATE tbl_usuarios SET estado = 0 WHERE usuario_id = ?', [id])
//         db.end()
//         if (result.affectedRows > 0) {
//             res.json({
//                 message: 'Usuario eliminado correctamente'
//             })
//         } else {
//             res.status(404).json({
//                 message: 'No se pudo eliminar el usuario'
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Something goes wrong'
//         })
//     }
// }