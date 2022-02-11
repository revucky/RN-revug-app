import { useState, useEffect } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {} from "react-native";
import { Provider } from "react-redux";

import { store } from "./src/redux/store";
import Main from "./src/components/Main";

const loadApp = async () => {
  await Font.loadAsync({
    "NotoSans-Regular": require("./assets/Fonts/NotoSans-Regular.ttf"),
    // "Dongle-Regular": require("./assets/Fonts/Dongle-Regular.ttf"),
    // "Dongle-Bold": require("./assets/Fonts/Dongle-Bold.ttf"),
    // "Dongle-Light": require("./assets/Fonts/Dongle-Light.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApp}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
}
{
  /* <AuthStack.Navigator>
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
        </AuthStack.Navigator> */
}
{
  /* <TabNav.Navigator>
          <TabNav.Screen
            options={{ headerShown: false }}
            name="Стіна"
            component={PostScreen}
          />
          <TabNav.Screen name="Створити" component={CreateScreen} />
          <TabNav.Screen
            options={{ headerShown: false }}
            name="Профіль"
            component={ProfileScreen}
          />
        </TabNav.Navigator> */
}
