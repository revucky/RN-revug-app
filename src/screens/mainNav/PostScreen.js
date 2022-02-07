import {} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DefaulScreenPost from "../nestedScreens/DefaultScreenPost";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const NestedInPost = createStackNavigator();

const PostScreen = () => {
  return (
    <NestedInPost.Navigator>
      <NestedInPost.Screen name="Додати пост" component={DefaulScreenPost} />
      <NestedInPost.Screen name="Мапа" component={MapScreen} />
      <NestedInPost.Screen name="Коментарі" component={CommentsScreen} />
    </NestedInPost.Navigator>
  );
};
export default PostScreen;
