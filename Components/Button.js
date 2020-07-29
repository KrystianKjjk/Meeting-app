import React from 'react'
import { View, StyleSheet } from 'react-native'
import Data from 'react-native'
import color from '../Constants/color'

const Button = props => {
    return (
        <View style={{ ...styles.button, ...props.style }}>
            <Data.Button
                title={props.title}
                color={props.color || color.button}
                onPress={props.onPress}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        width: 150,
        borderRadius: 10,
    }
})

export default Button