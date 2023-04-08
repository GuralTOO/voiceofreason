import axios from "axios";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const SERVER_URL = "http://136.167.109.24:3000"; // Replace with your server's URL or IP address

useEffect(() => {
  GoogleSignin.configure({
    webClientId:
      "341325727905-05u32m4d3ue5umn4l04ho7p9js35a6jm.apps.googleusercontent.com",
    offlineAccess: true,
  });
}, []);

const authenticate = async (token) => {
  try {
    const response = await axios.post(`${SERVER_URL}/authenticate`, { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const completeText = async (text) => {
  try {
    console.log(
      "trying to complete text:" +
        text +
        " with address:" +
        `${SERVER_URL}/complete-text`
    );
    const response = await axios.post(`${SERVER_URL}/complete-text`, { text });
    return response;
  } catch (error) {
    console.log(response.status, error.message);
    throw error;
  }
};

const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const { idToken } = userInfo;

    const serverResponse = await authenticate(idToken);
    return serverResponse;
  } catch (error) {
    throw error;
  }
};

export { completeText, signInWithGoogle };
