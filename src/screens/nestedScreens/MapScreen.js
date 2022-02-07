import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.location;
  return (
    <View style={s.container}>
      <MapView
        style={s.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="фото сделано тут" />
      </MapView>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
