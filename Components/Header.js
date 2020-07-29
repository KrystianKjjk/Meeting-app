import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import color from '../Constants/color'
import Button from './Button'
import BackButton from './BackButton'


const Header = (props) => {
    return (
        <View style={{ position: 'relative' }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}> MEETINGS APPLICATION</Text>
            </View>
            <View style={{ position: 'absolute', right: '2%', top: '50%' }}>
                {props.children}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: color.headerBackground,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // position: 'relative'
    },
    headerTitle: {
        fontSize: 18
    }
})

export default Header

{/* <Button style={{ position: 'absolute', alignItems: 'flex-end', justifyContent: 'flex-end' }} title="back" /> */ }