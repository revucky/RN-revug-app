import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Bird = ({birdBottom,birdLeft}) => {
  const birdWidth = 50
  const birdHeight = 60
  return (
    <View style={{...s.bird, height: birdHeight,
       left: birdLeft -(birdWidth/2),
        width: birdWidth, bottom: birdBottom -(birdHeight/2)}}/>
  )
}

export default Bird

const s = StyleSheet.create({
  bird:{
    position: 'absolute',
    backgroundColor: "blue",
  }
})