import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Item from './Item'
import color from '../Constants/color'

const DataTable = props => {
    return (
        <View style={{ ...styles.tableStyle, ...props.style }}>
            <Text style={styles.title}>{props.dataTitle}</Text>
            <View style={styles.list}>
                <FlatList
                    keyExtractor={(item, idx) => item.id.toString()}
                    style={styles.list}
                    data={props.data}
                    renderItem={item =>
                        <Item

                            id={item.item.id}
                            value={props.itemTitle(item.item)}
                            onPress={() => props.onPressItem(item.item)}
                        />
                    }

                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    tableStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: color.title,
        marginVertical: 8
    },
    list: {
        flex: 1,
        width: '100%'
    }
})

export default DataTable