import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { Foundation, FontAwesome } from "@expo/vector-icons";
import Gallery from "react-native-image-gallery";
import db from "../../../firebase/config";

const DefaultScreenPost = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    db.firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };
  useEffect(() => {
    getAllPost();
    // if (route.params) {
    //   setPosts((prevState) => [...prevState, route.params]);
    // }
  }, []);

  return (
    <View style={s.container}>
      <View>
        <FlatList
          style={{ marginTop: 70 }}
          data={posts}
          keyExtractor={(item, inx) => inx.toString()}
          renderItem={({ item }) => (
            <View>
              <Image style={s.img} source={{ uri: item.photo }} />
              <Text style={s.signImg}>{item.coment}</Text>
              <View style={s.btnWrap}>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Text
                    onPress={() =>
                      navigation.navigate("Мапа", { location: item.location })
                    }
                    style={s.text}
                  >
                    Відкрити
                  </Text>
                  <Foundation name="map" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Text
                    onPress={() =>
                      navigation.navigate("Коментарі", { postId: item.id })
                    }
                    style={s.text}
                  >
                    Коментарі
                  </Text>
                  <FontAwesome name="comment" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    height: "96%",
    // flex: 1,
    justifyContent: "flex-end",
  },
  img: {
    marginHorizontal: 10,
    height: 200,
  },
  btnWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  text: {
    marginRight: 10,
    fontFamily: "NotoSans-Regular",
    fontSize: 20,
  },
  signImg: {
    fontSize: 20,
    alignSelf: "center",
    color: "#f57b0b",
    fontFamily: "NotoSans-Regular",
  },
});
export default DefaultScreenPost;
