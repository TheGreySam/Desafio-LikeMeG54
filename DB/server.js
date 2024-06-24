//import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

const port = process.env.PORT || 3000;

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,

});


  try {
    await pool.query("SELECT NOW()");
    console.log(`Base de datos conectada en ${port}`);
  } catch (error) {
    console.log(error);
  }



