// migrations/migrate.js
const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

(async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();
    await pool.query(sql);
    console.log('Migração executada com sucesso!');
    process.exit();
  } catch (err) {
    console.error('Erro ao executar migração:', err);
    process.exit(1);
  }
})();
