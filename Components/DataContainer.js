import React from 'react'
import { View, StyleSheet } from 'react-native'
import color from '../Constants/color'

const DataContainer = props => {
    return (
        <View style={styles.container} >
            {props.children}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: color.mainBackground
    }
})

export default DataContainer