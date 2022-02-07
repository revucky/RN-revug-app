import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//icons
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import LoginScreen from "./screens/auth/LoginScreen";
import Registr from "./screens/auth/Registr";
import ProfileScreen from "./screens/mainNav/ProfileScreen";
import CreateScreen from "./screens/mainNav/CreateScreen";
import PostScreen from "./screens/mainNav/PostScreen";

const AuthStack = createStackNavigator();
const TabNav = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registr"
          component={Registr}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <TabNav.Navigator>
      <TabNav.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons name="add-photo-alternate" size={28} color={color} />
          ),
        }}
        name="Галерея"
        component={PostScreen}
      />
      <TabNav.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialIcons name="add-a-photo" size={28} color={color} />
          ),
        }}
        name="Створити"
        component={CreateScreen}
      />
      <TabNav.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={28}
              color={color}
            />
          ),
        }}
        name="Ще"
        component={ProfileScreen}
      />
    </TabNav.Navigator>
  );
};
