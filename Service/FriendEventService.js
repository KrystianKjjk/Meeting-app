import { db } from './db'

export const insertFriendEvent = (eventId, friendId) => {
    const promise = new Promise((resole, reject) => {
        db.transaction(tx => {
            tx.executeSql(`INSERT INTO friends_events (eventId, friendID) VALUES (?, ?)`,
                [eventId, friendId],
                (_, result) => { resole(result) },
                (_, err) => { reject(err) })
        });
    });
    return promise;
}
export const getFriendsForEvent = (eventId) => {
    const promise = new Promise((resole, reject) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * from friends INNER JOIN friends_events where friends.id = friends_events.friendId AND friends_events.eventId = ?`,
                [eventId],
                (_, result) => { resole(result) },
                (_, err) => { reject(err) })
        });
    });
    return promise;
}