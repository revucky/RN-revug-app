import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import db from "../../../firebase/config";
import { Fontisto } from "@expo/vector-icons";

const DefaulScreenElse = ({ navigation }) => {
  const { nickname } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);
  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) => data.docs.map((doc) => ({ ...doc.data() })));
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View style={s.container}>
      <View style={s.wrap}>
        <Text style={s.text}>Вітаю, тебе {nickname}</Text>
        <TouchableOpacity style={s.btn} activeOpacity={0.7} onPress={signOut}>
          <Text style={s.textBtn}>Вихід</Text>
        </TouchableOpacity>
      </View>
      <View style={s.wrapApp}>
        {/* top left cell */}
        <TouchableOpacity style={s.wrapBtn_top_left}>
          <Fontisto
            style={{ marginRight: 10 }}
            name="stopwatch"
            size={24}
            color="black"
          />
          <Text
            onPress={() => navigation.navigate("Секундомір")}
            style={s.text}
          >
            Секундомір
          </Text>
        </TouchableOpacity>
        {/* top right cell */}
        <TouchableOpacity style={s.wrapBtn_top_right}>
          <Image
            style={{ width: 28, height: 28, marginRight: 10 }}
            source={require("../../../assets/tictac.png")}
          />
          <Text onPress={() => navigation.navigate("Іксо")} style={s.text}>
            ІксО
          </Text>
        </TouchableOpacity>
        {/* mid left cell */}
        <View style={{ flexDirection: "row" }}>
          <Pressable style={s.wrapBtn_mid_left}>
            <Image
              style={{ width: 28, height: 28, marginRight: 10 }}
              source={require("../../../assets/tower.png")}
            />
            <Text
              onPress={() => navigation.navigate("ВежаЗахисту")}
              style={s.text}
            >
              ВежаЗахисту
            </Text>
          </Pressable>
          {/* mod right cell */}
          <Pressable style={s.wrapBtn_mid_right}>
            <Image
              style={{ width: 28, height: 28, marginRight: 10 }}
              source={require("../../../assets/replay.png")}
            />
            <Text
              // onPress={() => navigation.navigate("Секундомір")}
              style={s.text}
            >
              Щось
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  wrap: {
    marginTop: 40,
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: "#1a1e25",
    fontFamily: "NotoSans-Regular",
    fontSize: 20,
  },
  textBtn: {
    color: "#fff",
    fontFamily: "NotoSans-Regular",
    fontSize: 15,
  },
  btn: {
    borderRadius: 6,
    width: 50,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    ...Platform.select({
      ios: {
        backgroundColor: "#f57b0b",
        // borderColor: "#f0f8f9",
      },
      android: {
        backgroundColor: "#f57b0b",
        // borderColor: "transparent",
      },
    }),
    // backgroundColor: Platform.OS === "ios" ? "transparent" : "#f57b0b",
    // borderColor: Platform.OS === "ios" ? "#f0f8f9" : "transparent",
  },
  wrapApp: {
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 30,
  },
  wrapBtn_top_left: {
    backgroundColor: "#f57b0b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 2,
    borderRightWidth: 2,
    width: 188,
    height: 70,
  },
  wrapBtn_top_right: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 2,
    borderLeftWidth: 0,
    width: 187,
    height: 70,
  },
  wrapBtn_mid_left: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    width: 188,
    height: 70,
  },
  wrapBtn_mid_right: {
    backgroundColor: "#f57b0b",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    width: 188,
    height: 70,
  },
});
export default DefaulScreenElse;
