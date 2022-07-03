
export interface config { 
    user: string,
    password: string,
    server: string,
    database: string,
    pool: {
        max: number,
        min: number,
        idleTimeoutMillis: number
    },
    options: {
        encrypt: boolean, // for azure
        trustServerCertificate: boolean // change to true for local dev / self-signed certs
    }
}