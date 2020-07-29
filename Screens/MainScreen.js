import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import color from '../Constants/color'
import Button from '../Components/Button'
import DataTable from '../Components/DataTable'
import { ScreenContext } from '../ScreenContext'
import AddFriendScreen from './AddFriendScreen'
import AddMeetingScreen from './AddMeetingScreen'
import FriendScreen from './FriendScreen'
import MeetingScreen from './MeetingScreen'
import { useOrientation } from '../MyHooks/useOrientation'
import { getFriends } from '../Service/FriendService'
import { getEvents } from '../Service/EventService';
import { getFriendsForEvent } from '../Service/FriendEventService'

const MainScreen = () => {
    const { handleScreenChange } = useContext(ScreenContext);
    const [friends, setFriends] = useState([]);
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        async function Friends() {
            const result = await getFriends();
            setFriends(result.rows._array);
        }
        async function Meetings() {
            const result = await getEvents();
            setMeetings(result.rows._array);
        }
        try {
            Friends();
            Meetings();

        }
        catch (err) {
            console.log(err);
        }
        return () => {
        };
    }, [])
    const horizontalOrientation = {
        tableStyle: {
            width: '50%',
            height: '70%'
        },
        tableDirection: 'row'
    };
    const verticalOrientation = {
        tableStyle: {
            width: '100%',
            height: '44%'
        },
        tableDirection: 'column'
    };

    const { orientation } = useOrientation(verticalOrientation, horizontalOrientation);

    return (
        <View style={styles.container}>
            <View style={styles.addButtons}>
                <Button title='Add friends' onPress={() => handleScreenChange(<AddFriendScreen />)} />
                <Button title='Add meeting' onPress={() => handleScreenChange(<AddMeetingScreen availableFriends={friends} />)} />
            </View>
            <View style={{ flex: 1, flexDirection: orientation.tableDirection }}>
                <DataTable
                    style={orientation.tableStyle}
                    dataTitle='FRIENDS'
                    data={friends}
                    itemTitle={item => `${item.name} ${item.surname}`}
                    onPressItem={(item) => handleScreenChange(<FriendScreen {...item} />)}
                />
                <DataTable
                    style={orientation.tableStyle}
                    dataTitle='MEETINGS'
                    data={meetings}
                    itemTitle={item => `${item.eventName}`}
                    onPressItem={(item) => handleScreenChange(<MeetingScreen {...item} />)} />
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground
    },
    addButtons: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-around',
        marginBottom: 10
    },

})

export default MainScreen
