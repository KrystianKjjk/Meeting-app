import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DatePicker from 'react-native-datepicker'
import color from '../Constants/color'


const MyDatePicker = (props) => {
    return (
        <View style={{ color: 'white' }}>
            <Text style={styles.text}>{props.title}</Text>
            <DatePicker
                textColor={"#fff"}
                value={props.date}
                style={{ width: '100%', color: 'white' }}
                date={props.date}
                mode="datetime"
                placeholder="select date"
                format="YYYY-MM-DD HH:MM"
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                }}
                onDateChange={props.onDateChange}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        color: color.title,
        fontSize: 15

    },
})

export default MyDatePicker