import { useSelector } from "react-redux";
import { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import db from "../../../firebase/config";

const ProfileScreen = () => {
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
});
export default ProfileScreen;
