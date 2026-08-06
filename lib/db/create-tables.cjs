const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({ 
  connectionString: 'postgresql://postgres:419000%40Anushree@localhost:5432/file_recreator' 
});

const createDelegatesTable = `
  CREATE TABLE IF NOT EXISTS delegates (
    id SERIAL PRIMARY KEY, 
    portfolio TEXT NOT NULL, 
    phone_number TEXT NOT NULL, 
    email TEXT, 
    category TEXT NOT NULL, 
    role TEXT NOT NULL
  )
`;

const createScoresTable = `
  CREATE TABLE IF NOT EXISTS delegate_scores (
    id SERIAL PRIMARY KEY, 
    delegate_id INTEGER NOT NULL REFERENCES delegates(id), 
    day TEXT NOT NULL, 
    attendance TEXT, 
    opening_statement NUMERIC, 
    chits NUMERIC, 
    mod1 NUMERIC, 
    mod2 NUMERIC, 
    mod3 NUMERIC, 
    mod4 NUMERIC, 
    lobbying NUMERIC, 
    solution_paper NUMERIC, 
    updated_at TEXT NOT NULL
  )
`;

pool.query(createDelegatesTable)
  .then(() => {
    console.log('Delegates table created successfully');
    return pool.query(createScoresTable);
  })
  .then(() => {
    console.log('Delegate scores table created successfully');
    pool.end();
  })
  .catch(err => {
    console.error('Error creating tables:', err.message);
    pool.end();
  });