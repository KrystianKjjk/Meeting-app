import { db } from './db'

export const getEvents = () => {
    const promise = new Promise((resole, reject) => {
        db.transaction(tx => {
            tx.executeSql(`SELECT * from events`,
                [],
                (_, result) => { resole(result) },
                (_, err) => { reject(err) })
        });
    });
    return promise;
}
export const insertEvent = (eventName, eventBegin, eventEnd, AddedFriendsId) => {
    const promise = new Promise((resole, reject) => {
        db.transaction(tx => {
            tx.executeSql(`INSERT INTO events (eventName, eventBegin, eventEnd) VALUES (?, datetime(?), datetime(?))`,
                [eventName, eventBegin, eventEnd],
                (_, result) => { resole(result) },
                (_, err) => { reject(err) })
        });
    });
    return promise;
}
export const deleteEvent = (eventId) => {
    const promise = new Promise((resole, reject) => {
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM friends_events WHERE eventId = ?`,
                [eventId],
                (_, result) => { resole(result) },
                (_, err) => { reject(err) })
        });
        db.transaction(tx => {
            tx.executeSql(`DELETE FROM events WHERE id = ?`,
                [eventId],
                (_, result) => { resole(result) },
                (_, err) => { reject(err) })
        });
    });
    return promise;
}