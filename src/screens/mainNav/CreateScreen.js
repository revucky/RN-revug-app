import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import db from "../../../firebase/config";
import { useSelector } from "react-redux";

const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [coment, setComent] = useState("");
  const [location, setLocation] = useState(null);
  const [isShowKeybord, setIsShowKeybord] = useState(false);

  const { userId, nickname } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      //запит чи не проти дати локацію
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let locationRs = await Location.getCurrentPositionAsync({});
      setLocation(locationRs);
    })();
  }, []);
  //зробити фото, і додати локацію
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    // const location = await Location.getCurrentPositionAsync();
    setPhoto(photo.uri);
  };
  //навігація на іншу вкладку
  const sendPhoto = () => {
    uploadPostToServ();
    navigation.navigate("Додати пост", { photo });
  };

  //на сервер
  const uploadPostToServ = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await db
      .firestore()
      .collection("posts")
      .add({ photo, coment, location: location.coords, userId, nickname });
  };
  //збереження фото в сторедж
  const uploadPhotoToServer = async () => {
    const res = await fetch(photo);
    const file = await res.blob();
    const uniqueId = Date.now().toString();
    const data = await db.storage().ref(`postImage/${uniqueId}`).put(file);
    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniqueId)
      .getDownloadURL();
    return processedPhoto;
  };

  return (
    <KeyboardAvoidingView
      style={s.keyboardWrap}
      behavior={Platform.OS === "ios" && "padding"}
    >
      <View style={s.container}>
        <Camera style={s.camera} ref={setCamera} type={type}>
          {photo && (
            <View style={s.photoWrap}>
              <Image
                source={{ uri: photo }}
                style={{ width: 200, height: 200 }}
              />
            </View>
          )}
          <View style={s.btnWrap}>
            <TouchableOpacity onPress={takePhoto}>
              <MaterialIcons
                style={s.snap}
                name="camera"
                size={34}
                color="#f57b0b"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <MaterialCommunityIcons
                style={s.snap}
                name="camera-retake-outline"
                size={34}
                color="#f57b0b"
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: isShowKeybord ? 20 : 50 }}>
            <View>
              <TextInput
                style={s.input}
                onFocus={() => setIsShowKeybord(true)}
                placeholder="Підпис фото"
                placeholderTextColor={"#fff"}
                onChangeText={setComent}
              />

              <TouchableOpacity onPress={sendPhoto} style={s.btnSend}>
                <Text style={s.text}>Поділитися</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
    </KeyboardAvoidingView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    // height: "100%",
    flex: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  keyboardWrap: {
    // width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",

    // marginBottom: Platform.OS === "ios" ? 0 : 100,
  },
  photoWrap: {
    position: "absolute",
    top: 50,
    left: 0,
    borderColor: "#fff",
    borderWidth: 1,
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  btnWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginHorizontal: 20,
  },
  snap: {
    color: "#f57b0b",
  },
  btnSend: {
    height: 30,
    backgroundColor: "#f57b0b",
    borderRadius: 15,
    marginTop: 10,
    // justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  text: {
    color: "rgb(255, 255, 255)",
    fontFamily: "NotoSans-Regular",
    fontSize: 20,
  },
  input: {
    borderRadius: 10,
    height: 40,
    marginTop: 10,
    paddingLeft: 10,
    marginHorizontal: 20,
    backgroundColor: "#e9edf571",
    color: "#24ea56",
    paddingLeft: 10,
  },
});
export default CreateScreen;
