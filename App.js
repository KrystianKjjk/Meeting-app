import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header';
import MainScreen from './Screens/MainScreen';
import { ScreenContext } from './ScreenContext';
import DataContainer from './Components/DataContainer';
import BackButton from './Components/BackButton';
import { init } from './Service/db'

init().then(() => {
  console.log("initialized Db")
}).catch((err) => {
  console.log("error");
  console.log(err);
});

export default function App() {
  const [Screen, setScreen] = useState(<MainScreen />);
  const [backBtn, setBackBtn] = useState(null);

  const handleSetScreen = screen => {
    const main = <MainScreen />
    const data = <DataContainer>{screen}</DataContainer>
    const back = screen.type === main.type ? null : <BackButton />
    setScreen(data);
    setBackBtn(back);

  }
  return (
    <ScreenContext.Provider
      value={{ currentScreen: Screen, handleScreenChange: handleSetScreen }}>
      <View style={styles.container}>
        <Header >
          {backBtn}
        </Header>
        {Screen}
      </View>
    </ScreenContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});