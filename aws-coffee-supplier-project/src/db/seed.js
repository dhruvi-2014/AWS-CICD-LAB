const db = require('./database');
const existing = db.prepare('SELECT COUNT(*) AS count FROM suppliers').get().count;
if (existing > 0) {
  console.log('Seed skipped: supplier records already exist.');
  process.exit(0);
}
const suppliers = [
  ['Mountain Bean Co.', '12 Hill Road', 'Bengaluru', 'Karnataka', 'contact@mountainbean.example', '+91-90000-10001'],
  ['Sunrise Coffee Traders', '48 Market Street', 'Mysuru', 'Karnataka', 'sales@sunrisecoffee.example', '+91-90000-10002'],
  ['Green Valley Roasters', '7 Plantation Lane', 'Chikmagalur', 'Karnataka', 'hello@greenvalley.example', '+91-90000-10003']
];
const insert = db.prepare(`INSERT INTO suppliers (name, address, city, state, email, phone) VALUES (?, ?, ?, ?, ?, ?)`);
const transaction = db.transaction((rows) => rows.forEach((row) => insert.run(...row)));
transaction(suppliers);
console.log(`Seeded ${suppliers.length} suppliers.`);
