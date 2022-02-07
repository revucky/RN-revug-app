import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUp } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
  nickname: "",
};

export default function Registr({ navigation }) {
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [state, setState] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 20 * 2
  );
  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeybord(false);
    Keyboard.dismiss();
  };
  const handleSubmit = () => {
    setIsShowKeybord(false);
    Keyboard.dismiss();
    dispatch(authSignUp(state));
    setState(initialState);
  };

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width;
  //     setDimensions(width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     Dimensions.remove();
  //   };
  // }, []);

  return (
    <View style={s.container}>
      {/* <View style={s.paper}> */}
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          style={s.logo}
          source={require("../../../assets/aurora-borealis-gb72ebfbc5_1280.jpg")}
        >
          <KeyboardAvoidingView
            style={s.keyboardWrap}
            behavior={Platform.OS === "ios" && "padding"}
          >
            <Text style={s.hello}>Вітаю тебе в RevuG</Text>
            <View style={{ ...s.forma, marginBottom: isShowKeybord ? 20 : 50 }}>
              <View>
                <TextInput
                  style={s.input}
                  placeholder={"псевдо: `Sheva` "}
                  placeholderTextColor={"#1a1e25"}
                  onFocus={() => setIsShowKeybord(true)}
                  value={state.nickname}
                  onChangeText={(value) =>
                    setState((prevSt) => ({ ...prevSt, nickname: value }))
                  }
                />
              </View>
              <View>
                <TextInput
                  style={s.input}
                  placeholder={"Електронна адреса: `posta@ua.ua`"}
                  placeholderTextColor={"#1a1e25"}
                  onFocus={() => setIsShowKeybord(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevSt) => ({ ...prevSt, email: value }))
                  }
                />
              </View>
              <View>
                <TextInput
                  style={s.input}
                  placeholder={"Пароль: `Ha$lo1`"}
                  placeholderTextColor={"#1a1e25"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeybord(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevSt) => ({ ...prevSt, password: value }))
                  }
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={s.btn}
                  activeOpacity={0.7}
                  onPress={handleSubmit}
                >
                  <Text style={s.text}>ЗАРЕЄСТРУВАТИСЯ</Text>
                </TouchableOpacity>
                <View style={{ ...s.btn, width: 90 }}>
                  <Text
                    style={s.text}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Увійти
                  </Text>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
      {/* <Text style={s.text}>RevuG app</Text> */}
      {/* </View> */}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
  },
  keyboardWrap: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? "10%" : 0,
  },
  hello: {
    fontFamily: "NotoSans-Regular",
    fontSize: 35,
    color: "#1a1e25",
    alignItems: "center",
    marginBottom: 100,
    marginHorizontal: 10,
  },
  text: {
    color: "rgb(255, 255, 255)",
    fontFamily: "NotoSans-Regular",
    fontSize: 20,
  },
  paper: {
    backgroundColor: "transparent",
    borderRadius: 20,
    width: 160,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "flex-end",
    // width: 150,
    // height: 140,
  },

  input: {
    borderColor: "#f0f8f9",
    backgroundColor: "#e9edf571",
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    color: "#006212",
    paddingLeft: 10,
    marginBottom: 10,
  },
  forma: {
    // marginHorizontal: 20,
    width: "80%",
  },
  btn: {
    borderRadius: 6,
    width: 200,
    height: 40,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
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
