import { db } from './db'

export const insertFriend = (name, surname) => {
    const promise = new Promise((resole, reject) => {
        db.transaction(tx => {
            tx.executeSql(`INSERT INTO friends (name, surname) VALUES (?, ?)`,
                [name, surname],
                (_, result) => { resole(result) },
                (_, err) => { reject(err) })
        });
    });
    return promise;
}
export const getFriends = () => {
    const promise = new Promise((resole, reject) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM friends`,
                [],
                (_, result) => { resole(result) },
                (_, err) => { reject(err) })
        });
    });
    return promise;
}

export const updateFriend = (id, name, surname) => {
    const promise = new Promise((resole, reject) => {
        db.transaction(tx => {
            tx.executeSql(`UPDATE friends SET name = ?, surname = ? WHERE id = ?`,
                [name, surname, id],
                (_, result) => { resole(result) },
                (_, err) => { reject(err) })
        });
    });
    return promise;
}
export const deleteFriend = (id) => {
    const promise = new Promise((resole, reject) => {
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM friends_events WHERE friendId = ?`,
                [id],
                (_, result) => { resole(result) },
                (_, err) => { reject(err) });

            tx.executeSql(`DELETE FROM friends WHERE id = ?`,
                [id],
                (_, result) => { resole(result) },
                (_, err) => { reject(err) })
        });
    });
    return promise;
}