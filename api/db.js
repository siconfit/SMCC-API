import { createConnection } from 'mysql2/promise'

export async function openDB() {
    try {
        return await createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'bdd_smcc',
            port: '3306',
            connectTimeout: 30000,
        })
    } catch {
        console.log("error conexion")
    }

}