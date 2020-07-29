import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from './Button'
import MainScreen from '../Screens/MainScreen';
import { ScreenContext } from '../ScreenContext';

const BackButton = () => {
    const { handleScreenChange } = useContext(ScreenContext);
    return (
        <View style={styles.btnContainer}>
            <Button title='BACK' style={styles.backBtn}
                onPress={() => handleScreenChange(<MainScreen />)}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    backBtn: {
        width: 70,
        height: 30
    },
    btnContainer: {
        alignItems: 'flex-end'
    }
})

export default BackButton