import * as  SQLite from 'expo-sqlite';

console.log(SQLite);
export const db = SQLite.openDatabase('MeetingsApp.db');

export const init = () => {
    console.log(db);
    const promise = new Promise((resole, reject) => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' +
                'friends (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, surname TEXT NOT NULL )',
                [],
                () => { resole() },
                (_, err) => { reject(err) })
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' +
                'events (id INTEGER PRIMARY KEY NOT NULL, eventName TEXT NOT NULL, eventBegin DATETIME NOT NULL, eventEnd DATETIME NOT NULL) ',
                [],
                () => { resole() },
                (_, err) => { reject(err) })
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' +
                'friends_events (id INTEGER PRIMARY KEY NOT NULL, eventId INTEGER NOT NULL, friendId INTEGER NOT NULL)',
                [],
                () => { resole() },
                (_, err) => { reject(err) })
        });
    });
    return promise;
}

