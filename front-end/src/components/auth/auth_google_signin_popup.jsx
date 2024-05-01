import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase";
import Cookies from "js-cookie";
import { useMyContext } from "../context";

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const AuthWithGoogle = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      try {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const token = credential.accessToken;

        const user = result.user.providerData[0];

        return { token, user };

      } catch (error) {
        return { token: null, user: null };
      }
    }).catch((error) => {
      return { token: null, user: null };
    });
};

export { AuthWithGoogle }