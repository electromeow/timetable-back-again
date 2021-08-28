import pg from "pg";
const { Pool } = pg;
export default class DatabaseHelper {
  constructor(host, user, password, database, port=5432){
    this.pool = new Pool({
      host,
      user,
      password,
      database,
      port,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  // TODO
  // Port the database functions
}