import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import db from "../../../firebase/config";
import { useSelector } from "react-redux";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [coment, setComent] = useState("");
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const { nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  //створення комента
  const createPost = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ coment, nickname });
    setComent("");
  };
  //рендер  коментів
  const getAllComments = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <View style={s.c}>
      <FlatList
        data={allComments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={s.wrapComent}>
            <Text style={s.text}>{item.nickname} ✏️</Text>
            <Text style={s.text}>{item.coment}</Text>
          </View>
        )}
      />
      <KeyboardAvoidingView
        style={s.keyboardWrap}
        behavior={Platform.OS === "ios" && "padding"}
      >
        <View style={{ marginBottom: isShowKeybord ? 100 : 10 }}>
          <TextInput
            style={s.input}
            placeholder="Коментарій"
            placeholderTextColor={"#fff"}
            onChangeText={setComent}
            onFocus={() => setIsShowKeybord(true)}
          />

          <TouchableOpacity onPress={createPost} style={s.btnSend}>
            <Text style={s.text}>Залишити комент</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const s = StyleSheet.create({
  c: {
    flex: 1,
    justifyContent: "flex-end",
  },
  keyboardWrap: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginBottom: Platform.OS === "ios" ? "10%" : 0,
  },
  btnSend: {
    height: 30,
    backgroundColor: "#f57b0b",
    borderRadius: 15,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  text: {
    color: "rgb(255, 255, 255)",
    fontFamily: "NotoSans-Regular",
    fontSize: 20,
  },
  input: {
    backgroundColor: "#484a50c0",
    borderRadius: 10,
    height: 100,
    marginTop: 10,
    color: "#24ea56",
    paddingLeft: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  wrapComent: {
    backgroundColor: "#2556eca2",
    padding: 20,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 20,
  },
});
export default CommentsScreen;
