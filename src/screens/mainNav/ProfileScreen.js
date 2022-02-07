import { createStackNavigator } from "@react-navigation/stack";
import DefaulScreenElse from "../NestedScreenElse/DefaulScreenElse.jsx";
import StopWatch from "../NestedScreenElse/StopWatch";
import TicTac from "../NestedScreenElse/TicTac";
import TowerDefense from "../NestedScreenElse/TowerDefense";

const NestedInElse = createStackNavigator();

const ProfileScreen = () => {
  return (
    <NestedInElse.Navigator>
      <NestedInElse.Screen
        options={{
          headerShown: false,
        }}
        name="Початкова"
        component={DefaulScreenElse}
      />
      <NestedInElse.Screen name="Секундомір" component={StopWatch} />
      <NestedInElse.Screen name="Іксо" component={TicTac} />
      <NestedInElse.Screen name="ВежаЗахисту" component={TowerDefense} />
    </NestedInElse.Navigator>
  );
};
export default ProfileScreen;
