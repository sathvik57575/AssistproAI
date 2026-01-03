import {neon} from '@neondatabase/serverless';

// establishing connection to the database
const sql = neon(`${process.env.DATABASE_URL}`);


export default sql;