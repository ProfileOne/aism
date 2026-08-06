const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({ 
  connectionString: 'postgresql://postgres:419000%40Anushree@localhost:5432/file_recreator' 
});

// Restore phone number for delegate ID 1
const restoreDelegate = `
  UPDATE delegates 
  SET phone_number = '911234567890'
  WHERE id = 1
  RETURNING *;
`;

pool.query(restoreDelegate)
  .then(result => {
    console.log('Restored phone number for delegate (ID 1):', result.rows[0]);
    pool.end();
  })
  .catch(err => {
    console.error('Error:', err.message);
    pool.end();
  });