import { StyleSheet,  View, Image } from 'react-native'
import React from 'react'

const Obstacles = ({randomBottom, 
  color,
  obstaclesLeft, 
  obstaclesWidth, obstaclesHeigth, gap}) => {

  return (
    <>
      {/* <View style={{position: 'absolute',backgroundColor: color,
    width: obstaclesWidth, height: obstaclesHeigth, left: obstaclesLeft,
    bottom: randomBottom + obstaclesHeigth + gap,
    }}/>  */}
    <Image source={require('../../../../assets/shchur/bld.gif')} style={{position: 'absolute',
    width: obstaclesWidth, height: obstaclesHeigth, left: obstaclesLeft,
    bottom: randomBottom + obstaclesHeigth + gap,
    }}/>
    <Image source={require('../../../../assets/shchur/bld.gif')} style={{position: 'absolute',
    width: obstaclesWidth, height: obstaclesHeigth, left: obstaclesLeft,
    bottom: randomBottom,
    }}/>
      {/* <View style={{position: 'absolute',backgroundColor: color,
    width: obstaclesWidth, height: obstaclesHeigth, left: obstaclesLeft,
    bottom: randomBottom,
    }}/>  */}
    </>
  )
}

export default Obstacles

const styles = StyleSheet.create({})