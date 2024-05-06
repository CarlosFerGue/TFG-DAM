const Login = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/MyEventz.png")}
        resizeMode="contain"
      />
      <Text style={styles.bienvenido}>¡Bienvenid@!</Text>
      <Text style={styles.subtitulo}>
        Tu portal de actividades y experiencias en Zaragoza.
      </Text>
      <Text style={{ color: "#fff", fontSize: 24 }}>Main</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexG: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  logo: {
    width: "100%",
    maxHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bienvenido: {
    fontSize: 24,
    color: "#fff",
  },
  subtitulo: {
    fontSize: 24,
    color: "#fff",
  },
  titulo3: {
    backgroundColor: "tomato",
    flex: 1,
  },
});

export default Login;
