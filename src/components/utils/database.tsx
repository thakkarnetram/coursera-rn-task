import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'little-lemon.db',
    location: 'default',
  },
  () => console.log('Database open'),
  error => console.error('Could not open database', error),
);

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
