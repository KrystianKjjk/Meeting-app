import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../Components/Button'
import Input from '../Components/Input'
import { updateFriend, deleteFriend } from '../Service/FriendService'
import MainScreen from './MainScreen'
import { ScreenContext } from '../ScreenContext'

const FriendScreen = props => {
    const { handleScreenChange } = useContext(ScreenContext);
    const [IName, setIName] = useState(props.name);
    const [ISurname, setISurname] = useState(props.surname)
    const [Name, setName] = useState(props.name)
    const [Surname, setSurname] = useState(props.surname)
    const handleUpdateUser = async (id, name, surname) => {
        try {
            await updateFriend(id, name, surname);
            setIName(name);
            setISurname(surname);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteUser = async (id) => {
        try {
            await deleteFriend(id);
            handleScreenChange(<MainScreen />)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.container} >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.font}>  {IName}</Text>
                <Text style={styles.font}>  {ISurname}</Text>
            </View>
            <View style={{ width: '100%', justifyContent: 'center', padding: 20 }}>
                <Input name={"Name"} value={Name} onChangeText={setName} />
                <Input name={"Surname"} value={Surname} onChangeText={setSurname} />

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button title="Update" onPress={(e) => handleUpdateUser(props.id, Name, Surname)} />
                <Button title="Delete" onPress={(e) => handleDeleteUser(props.id)} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    font: {
        color: 'white',
        fontSize: 25
    }
})

export default FriendScreen