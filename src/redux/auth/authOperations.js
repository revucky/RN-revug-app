import { useDispatch } from "react-redux";
import db from "../../../firebase/config";
import { authSlice } from "./authReducer";

const { authSignOut, updateUserProfile, authStateChange } = authSlice.actions;

//вхід
const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
//реєстрація
const authSignUp =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;
      await user.updateProfile({ displayName: nickname });
      const { uid, displayName } = await db.auth().currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
//вихід
const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut());
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        nickname: user.displayName,
        userId: user.uid,
      };
      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export { authSignIn, authSignUp, authSignOutUser, authStateChangeUser };
