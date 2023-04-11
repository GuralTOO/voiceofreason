import axios from "axios";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

const SERVER_URL = "http://157.230.62.148:3000"; // Replace with your server's URL or IP address


GoogleSignin.configure({
  webClientId:
    "341325727905-05u32m4d3ue5umn4l04ho7p9js35a6jm.apps.googleusercontent.com",
  offlineAccess: true,
});

const completeText = async (text: string, googleID: string) => {
  try {
    console.log(
      "trying to complete text:" +
        text +
        " with address:" +
        `${SERVER_URL}/complete-text`
    );
    const response = await axios.post(`${SERVER_URL}/complete-text`, { text: text, idToken: googleID });
    return response;
  } catch (error: any) {
    console.log(error.response.status, error.message);
    throw error;
  }
};

const signIn = async (setUserID: Function) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
    setUserID(userInfo.idToken);
  } catch (error) {
    console.error(error);
  }
};

export { completeText, signIn };
