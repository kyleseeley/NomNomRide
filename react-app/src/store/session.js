import { csrfFetch } from "./csrf";

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_ORDERS = "session/SET_ORDERS";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});

const initialState = { user: null, orders: {} };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (
    firstname,
    lastname,
    email,
    username,
    address,
    city,
    state,
    lat,
    lng,
    password
  ) =>
  async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        username,
        address,
        city,
        state,
        lat,
        lng,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        const formattedErrors = {};
        for (const err of data.errors) {
          const splitErr = err.split(" : ");
          formattedErrors[splitErr[0]] = splitErr[1];
        }
        return formattedErrors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const restoreUserThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/session/");
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const editUserThunk = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/session/userInfo", {
    method: "PUT",
    body: JSON.stringify(user),
  });

  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const deleteUserThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/session/userInfo", {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeUser());
  }
  return response;
};

export const fetchUserOrders = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/session/orders");
    if (response.ok) {
      const responseData = await response.json();
      console.log("responseData", responseData);
      dispatch(setOrders(responseData));
    }
  } catch (error) {
    console.error("Error fetching user orders", error);
  }
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case SET_ORDERS:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
}
