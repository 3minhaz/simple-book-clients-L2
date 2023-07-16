import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase/firebase";

type ICredential = {
  email: string;
  password: string;
  name: string;
};
type ILoginCredential = {
  email: string;
  password: string;
};

type IInitialState = {
  email: string | null;
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
};

const initialState: IInitialState = {
  email: "",
  isLoading: false,
  isError: false,
  error: "",
};

export const registerUser = createAsyncThunk(
  "users/register",
  async ({ email, password, name }: ICredential) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (result.user.email) {
      updateProfile(result.user, {
        displayName: name,
      }).then(() => {
        console.log("user updated");
      });
    }
    return result.user.email;
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ email, password }: ILoginCredential) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (result) return result.user.email;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.email = "";
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.email = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.email = "";
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { setLoading, setUser } = userSlice.actions;

export default userSlice.reducer;
