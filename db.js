import 'dotenv/config'
import postgres from 'postgres'


const { PGHOST, PGUSER, PGDATABASE, PGPORT, PGPASSWORD } = process.env
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

export const sql = postgres(URL);