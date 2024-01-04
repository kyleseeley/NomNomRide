import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissAlert } from "../../store/alert";
import "./Alert.css";

let timeout;

const Alert = () => {
  const message = useSelector((storeState) => storeState.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
    //Use timer to self close after 4 sec. And clear the previous self close timer.
    //Otherwise the new alert will be closed before display for 4 sec.
    timeout = setTimeout(() => {
      dispatch(dismissAlert());
    }, 4000);
  }, [dispatch, message]);

  const shouldDisplay = message !== null;
  return (
    <div className={`alert-container ${shouldDisplay ? "" : "hidden"}`}>
      <div className="alert">
        <div>
          <i className="fa-solid fa-circle-check check-icon"></i>
        </div>
        <div>{message}</div>
        <div>
          <button
            className="icon-button"
            onClick={() => dispatch(dismissAlert())}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
