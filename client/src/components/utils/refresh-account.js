import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../features/auth/auth-slice";

const refreshAccountUtil = async (dispatch) => {
  try {
    const account = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/account`,
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      }
    );
    console.log(account.data.data);
    account && dispatch(authActions.login(account.data.data));
  } catch (error) {
    dispatch(authActions.logout());
  }
};

export default refreshAccountUtil;
