import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getFriendsForEvent } from '../Service/FriendEventService'
import { deleteEvent } from '../Service/EventService';
import DataTable from '../Components/DataTable';
import Button from '../Components/Button';
import { ScreenContext } from '../ScreenContext'
import MainScreen from './MainScreen';
import { useOrientation } from '../MyHooks/useOrientation';

const MeetingScreen = props => {

    const horizontalOrientation = {
        container: {
            flex: 1,
            flexDirection: 'row'
        },
        tableStyle: {
            width: '80%',
            height: '70%'
        },
    };
    const verticalOrientation = {
        container: {
            flexDirection: 'column',
            alignItems: 'center'
        },
        tableStyle: {
            width: '90%',
            height: '80%'
        },
    };

    const { orientation } = useOrientation(verticalOrientation, horizontalOrientation);
    const { handleScreenChange } = useContext(ScreenContext);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        async function friendsForMeeting() {
            const _friends = await getFriendsForEvent(props.id);
            setFriends(_friends.rows._array);

        }
        try {
            friendsForMeeting();

        }
        catch (err) {
            console.log(err);
        }
        return () => {
        };
    }, [])
    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteEvent(eventId);
            handleScreenChange(<MainScreen />)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <View style={orientation.container}>
            <View>
                <Button style={{ margin: 10 }} title="Delete" onPress={(e) => handleDeleteEvent(props.id)} />
                <Text style={styles.font}>  {props.eventName}</Text>
                <Text style={styles.font}>  {props.eventBegin}</Text>
                <Text style={styles.font}>  {props.eventEnd}</Text>
            </View>
            <DataTable
                style={orientation.tableStyle}
                dataTitle='INVITED FRIENDS'
                data={friends}
                itemTitle={item => `${item.name} ${item.surname}`}
                onPressItem={(item) => { }}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    font: {
        color: 'white'
    }
})

export default MeetingScreen