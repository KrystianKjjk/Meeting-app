import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import color from '../Constants/color'
const Item = props => {
    return (
        <View style={styles.item}>
            {/* <Text >{props.value}</Text> */}

            <Button title={props.value} onPress={props.onPress} color={color.listItem} />
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        width: '100%',
        margin: 1,
        paddingHorizontal: 10

    }
})

export default Item