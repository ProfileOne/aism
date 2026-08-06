const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({ 
  connectionString: 'postgresql://postgres:419000%40Anushree@localhost:5432/file_recreator' 
});

// Query an existing delegate and update to have no phone number
const updateDelegate = `
  UPDATE delegates 
  SET phone_number = NULL 
  WHERE id = 1
  RETURNING *;
`;

pool.query(updateDelegate)
  .then(result => {
    console.log('Updated delegate (ID 1) to have no phone number:', result.rows[0]);
    
    // Query to verify
    return pool.query('SELECT * FROM delegates WHERE id = 1');
  })
  .then(result => {
    console.log('Verification - Delegate without phone number:', result.rows[0]);
    pool.end();
  })
  .catch(err => {
    console.error('Error:', err.message);
    pool.end();
  });