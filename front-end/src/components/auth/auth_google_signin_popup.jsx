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
        const user = result.user.providerData[0];

        return { user };

      } catch (error) {
        return { user: null };
      }
    }).catch((error) => {
      return { user: null };
    });
};

export { AuthWithGoogle }