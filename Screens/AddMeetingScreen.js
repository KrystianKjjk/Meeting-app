import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MyDatePicker from '../Components/MyDatePicker'
import Input from '../Components/Input'
import Button from '../Components/Button'
import { useOrientation } from '../MyHooks/useOrientation'
import DataTable from '../Components/DataTable'
import { insertEvent } from '../Service/EventService';
import { insertFriendEvent } from '../Service/FriendEventService'
import moment from 'moment'

const AddMeetingScreen = (props) => {
    const horizontalOrientation = {
        tablesStyle: {
            width: '50%',
            height: '95%'
        },
        table: {
            width: '50%',
            height: '100%'
        },
        tableDirection: 'row',
        inputs: {
            width: '45%',
            height: '100%',
            justifyContent: 'space-around',
            marginRight: 10
        },
        horizontalAddButton: (<View style={{ alignItems: 'flex-end', marginTop: 15 }}>
            <Button title="Add Meeting" onPress={(e) => handleAddEvent(EventName, EventBegin, EventEnd, AddedFriends)} />
        </View>)

    };
    const verticalOrientation = {
        tablesStyle: {
            width: '100%',
            height: '70%'
        },
        table: {
            width: '100%',
            height: '50%'
        },
        tableDirection: 'column',
        inputs: {
            width: '100%'
        },
        verticalAddButton: (<View style={{ alignItems: 'flex-end', marginTop: 15 }}>
            <Button title="Add Meeting" onPress={(e) => handleAddEvent(EventName, EventBegin, EventEnd, AddedFriends)} />
        </View>)
    };
    const now = moment().format("YYYY-MM-DD HH:MM");
    const [EventName, setEventName] = useState('');
    const [EventBegin, setEventBegin] = useState(now);
    const [EventEnd, setEventEnd] = useState(now);
    const [AddedFriends, setAddedFriends] = useState([]);
    const [AvailableFriends, setAvailableFriends] = useState(props.availableFriends);

    const handleEventBegin = (e) => {
        setEventBegin(e);
    }
    const handleEventEnd = (e) => {
        setEventEnd(e);
    }

    const { orientation } = useOrientation(verticalOrientation, horizontalOrientation);
    const handleAddFriendToMeeting = (item) => {
        setAvailableFriends(AvailableFriends => AvailableFriends.filter(i => i.id != item.id));

        AddedFriends.push(item);
    }
    const handleRemoveAddFriendFromMeeting = (item) => {
        setAddedFriends(AddedFriends => AddedFriends.filter(i => i.id != item.id));

        AvailableFriends.push(item);
    }
    const handleAddEvent = async (eventName, begin, end, friends) => {
        try {
            const result = await insertEvent(eventName, begin, end, friends);
            const eventId = result.insertId;

            friends.forEach(async (friend) => {
                await insertFriendEvent(eventId, friend.id);
            });

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={{ ...styles.container }}>
            <View style={{ flexDirection: orientation.tableDirection, height: '80%' }}>
                <View style={{ ...orientation.inputs }}>
                    <Input name="Event name" value={EventName} onChangeText={setEventName} />

                    <MyDatePicker title={"Begin of the event"} date={EventBegin} onDateChange={handleEventBegin} />
                    <MyDatePicker title={"End of the event"} date={EventEnd} onDateChange={handleEventEnd} />
                    {orientation.horizontalAddButton}
                </View>
                <View style={{ flexDirection: orientation.tableDirection, ...orientation.tablesStyle }}>
                    <DataTable
                        style={{ ...orientation.table, backgroundColor: 'rgb(20,20,20)', margin: 5 }}
                        dataTitle='Available friends'
                        data={AvailableFriends}
                        itemTitle={item => `${item.name} ${item.surname}`}
                        onPressItem={(item) => handleAddFriendToMeeting(item)}
                    />
                    <DataTable
                        style={{ ...orientation.table, backgroundColor: 'rgb(20,20,20)', margin: 5 }}
                        dataTitle='Added Friends'
                        data={AddedFriends}
                        itemTitle={item => `${item.name} ${item.surname}`}
                        onPressItem={(item) => handleRemoveAddFriendFromMeeting(item)}
                    />
                    {orientation.verticalAddButton}
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'white',
        margin: 15,
        height: '100%'
    }
})

export default AddMeetingScreen