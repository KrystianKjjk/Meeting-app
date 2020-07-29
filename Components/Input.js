import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import color from '../Constants/color'
const Input = (props) => {

    return (
        <View style={{ ...styles.container, ...props.style }}>
            <Text style={styles.text}> {props.name}</Text>
            <TextInput
                style={styles.input}
                value={props.value}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {

    },
    text: {
        color: color.title,
        fontSize: 15

    },
    input: {
        color: 'white',
        borderColor: "white",
        borderBottomWidth: 1,
        backgroundColor: 'rgb(40,40,40)',
        fontSize: 15
    }
})

export default Input