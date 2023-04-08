import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView, Button, PermissionsAndroid, Platform, StatusBar } from 'react-native';
import Record from './Record';
import { completeText, signInWithGoogle} from './ApiService';
import { ScrollView } from '@motify/components';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';


interface ScrollableTextProps {
  textVariable: string;
}
const ScrollableText: React.FC<ScrollableTextProps> = ({textVariable}) => {
  return (
    <View style={[styles.textBox, {height: 200}]}>
      <ScrollView>
        <Text style={[styles.text]}>{textVariable}</Text>
      </ScrollView>
    </View>
  );
};

export default function App() {
  const [speechText, setSpeechText] = useState("");
  const [gptResponse, setGptResponse] = useState("GPT thinking like...");
  const [googleID, setGoogleID] = useState("");

  const callGPT = async (text: string) => {
    if(text == undefined || text == null || text == "" || text == " ") return;
    completeText(text).then((response) => {
      console.log(response.data.text);
      setGptResponse(response.data.text);
    });
  };

  return (
    <View style = {styles.container}> 
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInWithGoogle}
      />
      <Text style={styles.label}>Speech Text</Text>
      <TextInput multiline
        value = {speechText}
        editable = {true}
        onChangeText = {setSpeechText}
        maxLength={500}
        numberOfLines={1}
        style={[styles.textBox, {fontFamily: "sans-serif"}]}
        onSubmitEditing={() => callGPT(speechText)}
      />
      <Text style={[styles.label, {marginTop: 50}]}>GPT Response</Text>
      <ScrollableText textVariable = {gptResponse} />
      <View style={styles.voiceContainer}>
          {<Record
            onSpeechEnd={(value) => {
              console.log(value);
              setSpeechText(value[0]);
              callGPT(value[0]);
            }}
            onSpeechStart={() => {
              setSpeechText("GPT thinking like...");
            }}
        />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0, margin: 10,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    height: "40%",
    width: "80%",
    // alignSelf: "left",
    // flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  saveButton: {
    right: 0,
  },
  voiceContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textBox: {
    // height: 200,
    // width: '80%',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
});