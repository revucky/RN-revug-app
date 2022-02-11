import { StyleSheet,  View, Dimensions, TouchableWithoutFeedback, Text,
  Pressable,Image, Modal,ImageBackground } from 'react-native'
import {useState, useEffect} from 'react'
import Bird from './Bird';
import Obstacles from './Obstacles';

const image = { uri: "https://media.nature.com/w1219/magazine-assets/d41586-018-07202-6/d41586-018-07202-6_16233658.gif" };

const Shchur = ({ navigation}) => {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const birdLeft = screenWidth /2
  const [birdBottom, setBirdBottom]=useState(screenHeight/2) 
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth+screenWidth/2 +30)
  const [obstaclesNegHeigth, setObstaclesNegHeigth] = useState(0)
  const [obstaclesNegHeigthTwo, setObstaclesNegHeigthTwo] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [modalOpen, setModalOpen] = useState(false);
  const obstaclesWidth = 80
  const obstaclesHeigth = 300
  const gap = 160
  const gravity = 5
  let gameTimerId 
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo

  //start bird falling
  useEffect(() => {
    if(birdBottom>0){
     gameTimerId = setInterval(()=> {
        setBirdBottom(birdBottom=> birdBottom - gravity)
      },30)
      return ()=> {
        clearInterval(gameTimerId)
      }
    }
  },[birdBottom])
//fly
  const fly =() =>{
    if(!isGameOver && (birdBottom<screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
    }
  }
  //start first obstacles
useEffect(() => {
  if(obstaclesLeft> -obstaclesWidth){
   obstaclesLeftTimerId = setInterval(()=>{
      setObstaclesLeft(obstaclesLeft=> obstaclesLeft -5)
    },30)
    return ()=> {clearInterval(obstaclesLeftTimerId)}
  }else {
    setObstaclesLeft(screenWidth)
    setObstaclesNegHeigth(- Math.random() *100)
    setScore(score => score + 1)
  }
  
}, [obstaclesLeft])
  //start second obstacles
useEffect(() => {
  if(obstaclesLeftTwo> -obstaclesWidth){
   obstaclesLeftTimerIdTwo = setInterval(()=>{
      setObstaclesLeftTwo(obstaclesLeftTwo=> obstaclesLeftTwo -5)
    },30)
    return ()=> {clearInterval(obstaclesLeftTimerIdTwo)}
  }else {
    setObstaclesLeftTwo(screenWidth)
    setObstaclesNegHeigthTwo(- Math.random() *100)
  setScore(score => score + 1)
  }
  
}, [obstaclesLeftTwo])

//check collisions
useEffect(() => 
{
  if(
  ((birdBottom< (obstaclesNegHeigth + obstaclesHeigth + 30) ||
  birdBottom>(obstaclesNegHeigth + obstaclesHeigth + gap - 30)) &&
  (obstaclesLeft> screenWidth/2 -30 && obstaclesLeft< screenWidth/2 + 30))
  || 
  ((birdBottom< (obstaclesNegHeigthTwo+obstaclesHeigth+30) ||
  birdBottom>(obstaclesNegHeigthTwo+obstaclesHeigth + gap-30))&&
  (obstaclesLeftTwo> screenWidth/2 -30 && obstaclesLeftTwo< screenWidth/2+30))) 
  {
    gameOver()
  }
})

const gameOver= ()=>{
  clearInterval(gameTimerId)
  clearInterval(obstaclesLeftTimerId)
  clearInterval(obstaclesLeftTimerIdTwo)
  setIsGameOver(true)
  setModalOpen(true);
}
const reset =()=>{
  setBirdBottom(screenHeight/2) 
  setObstaclesLeft(screenWidth)
setObstaclesLeftTwo(screenWidth+screenWidth/2 +30)
setObstaclesNegHeigth(0)
  setObstaclesNegHeigthTwo(0)
  setIsGameOver(false)
setScore(0)
setModalOpen(false);
}

  return (
    <ImageBackground
          style={s.img}
          // source={require('../../../../assets/shchur/city.gif')}
          source={require('../../../../assets/shchur/image.jpg')}
          // source={image}
          resizeMode="cover"
        >
  <TouchableWithoutFeedback onPress={fly}>
    <View style={s.container}>
    <Bird birdBottom={birdBottom} birdLeft={birdLeft}/>
    <Obstacles randomBottom={obstaclesNegHeigth}
     color={'green'} obstaclesLeft={obstaclesLeft}
      obstaclesHeigth={obstaclesHeigth}
     obstaclesWidth={obstaclesWidth} gap={gap}/>
     {/*  */}
    <Obstacles randomBottom={obstaclesNegHeigthTwo}
     color={'pink'}
      obstaclesLeft={obstaclesLeftTwo}
      obstaclesHeigth={obstaclesHeigth}
     obstaclesWidth={obstaclesWidth} gap={gap}/>
    {isGameOver && 
    <Modal visible={modalOpen} animationType="fade" transparent={true}>
      <View style={s.modalwrap}>
      {isGameOver && <Text style={s.text}>Your score: {score}</Text>}
    <Pressable style={s.reset} onPress={reset}>
      <Text style={s.text}>Repeat game?</Text>
        <Image
          style={s.restIcon}
          source={require("../../../../assets/replay.png")}
        />
      </Pressable>
      <Pressable style={s.wrapBtn_mid_right}>
            {/* <Image
              style={{ width: 28, height: 28, marginRight: 10 }}
              source={require("../../../assets/birdIcon.png")}
            /> */}
            <Text
              onPress={() => navigation.navigate("Початкова")}
              style={s.text}
            >
              Back to menu
            </Text>
          </Pressable>
      </View>
      </Modal>
      }
    </View>
    </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

export default Shchur

const s = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    flex: 1,
    // resizeMode: "cover",
    // alignItems: "center",
    // justifyContent: "flex-end",
  },
  reset: {
    alignItems: "center",
flexDirection: "row",
  },
  restIcon: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 20,
    fontFamily: "NotoSans-Regular",
    letterSpacing: 1,
  },
  modalwrap: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 300,
    marginHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
})