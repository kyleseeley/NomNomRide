export const DISPLAY_ALERT = "alert/DISPLAY_ALERT";
export const DISMISS_ALERT = "alert/DISMISS_ALERT";

// action
export const displayAlert = (message) => ({
  type: DISPLAY_ALERT,
  message,
});

export const dismissAlert = () => ({
  type: DISMISS_ALERT,
});

const initialState = null;

export default function alertReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_ALERT:
      return action.message;
    case DISMISS_ALERT:
      return null;
    default:
      return state;
  }
}
