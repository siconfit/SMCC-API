import { createConnection } from 'mysql2/promise'

export async function openDB() {
    try {
        return await createConnection({
            host: 'bvvflxauqcnuwl2mfizk-mysql.services.clever-cloud.com',
            user: 'uo4yi106jibzvvsu',
            password: 'D3RsgMJiW8VML2A3qNJF',
            database: 'bvvflxauqcnuwl2mfizk',
            port: '3306',
            connectTimeout: 30000,
        })
    } catch {
        console.log("error conexion")
    }

}