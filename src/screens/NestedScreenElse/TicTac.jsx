import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";

const windowWidth = Dimensions.get("window").width;

const TicTac = () => {
  const [active_player, setActive_player] = useState("X");
  const [markers, setMarkers] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  //game
  const markPosition = (position) => {
    if (!markers[position]) {
      let temp = [...markers];
      temp[position] = active_player;
      setMarkers(temp);
      if (active_player === "X") {
        setActive_player("O");
      } else {
        setActive_player("X");
      }
    }
  };
  // reset
  const resetMark = () => {
    setMarkers([null, null, null, null, null, null, null, null, null]);
  };
  //win calc
  const winner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  useEffect(() => {
    const win = winner(markers);
    if (win === "X") {
      Toast.show({
        type: "info",
        text1: "Переможець",
        text2: "Гравець Х переміг",
      });
      resetMark();
    } else if (win === "O") {
      Toast.show({
        type: "info",
        text1: "Переможець",
        text2: "Гравець О переміг",
      });
      resetMark();
    }
  }, [markers]);

  return (
    <SafeAreaView style={s.container}>
      <View
        style={[
          s.playerInfo,
          { backgroundColor: active_player === "X" ? "#007FF4" : "#f57b0b" },
        ]}
      >
        <Text style={s.playerText}>Гравець {active_player}</Text>
      </View>
      <Pressable style={s.reset} onPress={resetMark}>
        <Image
          style={s.restIcon}
          source={require("../../../assets/replay.png")}
        />
      </Pressable>
      <View style={s.areaGame}>
        {/* top left cell */}
        <Pressable style={s.playerX_top_left} onPress={() => markPosition(0)}>
          {markers[0] === "X" && (
            <Image
              style={s.icon}
              source={require("../../../assets/cross.png")}
            />
          )}
          {markers[0] === "O" && (
            <Image style={s.icon} source={require("../../../assets/0.png")} />
          )}
        </Pressable>
        {/* top mid cell */}
        <Pressable style={s.playerX_top_mid} onPress={() => markPosition(1)}>
          {markers[1] === "X" && (
            <Image
              style={s.icon}
              source={require("../../../assets/cross.png")}
            />
          )}
          {markers[1] === "O" && (
            <Image style={s.icon} source={require("../../../assets/0.png")} />
          )}
        </Pressable>
        {/* top right cell */}
        <Pressable style={s.playerX_top_right} onPress={() => markPosition(2)}>
          {markers[2] === "X" && (
            <Image
              style={s.icon}
              source={require("../../../assets/cross.png")}
            />
          )}
          {markers[2] === "O" && (
            <Image style={s.icon} source={require("../../../assets/0.png")} />
          )}
        </Pressable>
        {/* mid left cell */}
        <Pressable style={s.playerX_mid_left} onPress={() => markPosition(3)}>
          {markers[3] === "X" && (
            <Image
              style={s.icon}
              source={require("../../../assets/cross.png")}
            />
          )}
          {markers[3] === "O" && (
            <Image style={s.icon} source={require("../../../assets/0.png")} />
          )}
        </Pressable>
        {/* mid mid cell */}
        <Pressable style={s.playerX_mid_mid} onPress={() => markPosition(4)}>
          {markers[4] === "X" && (
            <Image
              style={s.icon}
              source={require("../../../assets/cross.png")}
            />
          )}
          {markers[4] === "O" && (
            <Image style={s.icon} source={require("../../../assets/0.png")} />
          )}
        </Pressable>
        {/* mid right cell */}
        <Pressable style={s.playerX_mid_right} onPress={() => markPosition(5)}>
          {markers[5] === "X" && (
            <Image
              style={s.icon}
              source={require("../../../assets/cross.png")}
            />
          )}
          {markers[5] === "O" && (
            <Image style={s.icon} source={require("../../../assets/0.png")} />
          )}
        </Pressable>
        {/* bottom left cell */}
        <Pressable
          style={s.playerX_bottom_left}
          onPress={() => markPosition(6)}
        >
          {markers[6] === "X" && (
            <Image
              style={s.icon}
              source={require("../../../assets/cross.png")}
            />
          )}
          {markers[6] === "O" && (
            <Image style={s.icon} source={require("../../../assets/0.png")} />
          )}
        </Pressable>
        {/* bottom mid cell */}
        <Pressable style={s.playerX_bottom_mid} onPress={() => markPosition(7)}>
          {markers[7] === "X" && (
            <Image
              style={s.icon}
              source={require("../../../assets/cross.png")}
            />
          )}
          {markers[7] === "O" && (
            <Image style={s.icon} source={require("../../../assets/0.png")} />
          )}
        </Pressable>
        {/* bottom right cell */}
        <Pressable
          style={s.playerX_bottom_right}
          onPress={() => markPosition(8)}
        >
          {markers[8] === "X" && (
            <Image
              style={s.icon}
              source={require("../../../assets/cross.png")}
            />
          )}
          {markers[8] === "O" && (
            <Image style={s.icon} source={require("../../../assets/0.png")} />
          )}
        </Pressable>
      </View>
      <Toast position="top" topOffset={20} autoHide visibilityTime={2500} />
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#fff",
  },
  playerInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 20,
  },
  playerText: {
    fontSize: 20,
    fontFamily: "NotoSans-Regular",
    letterSpacing: 1,
    color: "#fff",
  },
  areaGame: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 80,
  },
  playerX_top_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 6,
    borderBottomWidth: 6,
  },
  playerX_top_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 6,
  },
  playerX_top_right: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 6,
    borderLeftWidth: 6,
  },
  playerX_mid_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 6,
    borderBottomWidth: 6,
  },
  playerX_mid_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 6,
  },
  playerX_mid_right: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 6,
    borderLeftWidth: 6,
  },
  playerX_bottom_left: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 6,
  },
  playerX_bottom_mid: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  playerX_bottom_right: {
    width: windowWidth / 3.2,
    height: windowWidth / 3.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 6,
  },
  icon: {
    width: 60,
    height: 60,
  },
  reset: {
    position: "absolute",
    top: 80,
    right: 20,
  },
  restIcon: {
    width: 80,
    height: 80,
  },
});

export default TicTac;
