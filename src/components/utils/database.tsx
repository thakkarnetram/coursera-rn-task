import SQLite from 'react-native-sqlite-storage';

// Open database
const db = SQLite.openDatabase(
  {
    name: 'little-lemon.db',
    location: 'default',
  },
  () => console.log('Database open'),
  error => console.error('Could not open database', error),
);

// Create table
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        image TEXT
       );`,
      [],
      () => console.log('Created Table'),
      error => console.error('Error creating table ', error),
    );
  });
};

// Insert Menu items
export const insertMenuItems = (name, description, image) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO menu (name, description, image) VALUES (?, ?, ?)',
      [name, description, image],
      (_, res) => console.log('Data added ', res),
      error => console.error('Error creating table ', error),
    );
  });
};

// Fetch data
export const fetchData = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM menu`,
      [],
      (_, result) => callback(result.rows.raw()),
      error => console.error('Error ', error)
    );
  });
};
