const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({ 
  connectionString: 'postgresql://postgres:419000%40Anushree@localhost:5432/file_recreator' 
});

const alterTable = `
  ALTER TABLE delegates 
  ALTER COLUMN phone_number DROP NOT NULL;
`;

pool.query(alterTable)
  .then(() => {
    console.log('Successfully made phone_number optional in delegates table');
    pool.end();
  })
  .catch(err => {
    console.error('Error altering table:', err.message);
    pool.end();
  });