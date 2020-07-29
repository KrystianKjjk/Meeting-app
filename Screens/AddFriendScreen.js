import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../Components/Button';
import Input from '../Components/Input';
import { insertFriend } from '../Service/FriendService';

const AddFriendScreen = () => {
    const [Name, setName] = useState('')
    const [Surname, setSurname] = useState('')
    const [CorrectInsert, setCorrectInsert] = useState('')

    const success = 'User has been successfully added';
    const fail = 'Error while trying add friend';

    const handleChangeName = (e) => {
        setName(e);
    }
    const AddFriend = async (e) => {
        try {
            if (Name.length < 3 || Surname.length < 3) {
                setCorrectInsert('Name and surname should have at least 3 characters')
                return;
            }
            await insertFriend(Name, Surname);
            setCorrectInsert(success);
        } catch (err) {
            console.log(err);
            setCorrectInsert(fail);
        }
    }
    return (
        <View style={styles.container} >
            <Input name="Name" value={Name} onChangeText={handleChangeName} />
            <Input name="Surname" value={Surname} onChangeText={setSurname} />
            <View style={{ alignItems: 'flex-end', marginTop: 15 }}>
                <Button title="Add friend" onPress={(e) => AddFriend(e)} />
            </View>
            <Text style={{ color: 'white', fontSize: 16 }}>{CorrectInsert}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'white',
        margin: 15
    }
})

export default AddFriendScreen