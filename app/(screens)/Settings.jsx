import { View, Text } from 'react-native'
import React from 'react'
import {StyleSheet} from 'react-native'



export default function Settings () {
  return (
    <View style={Styles.container}>
    <Text>Settings</Text>
    </View>
  )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

})


