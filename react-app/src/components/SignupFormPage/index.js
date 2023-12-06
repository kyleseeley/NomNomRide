import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword && password.length > 5) {
      const data = await dispatch(signUp(
        firstName, lastName, email,
        username, address, city,
        state, lat, lng, password
      ));
      if (data) {
        setErrors(data);
      }
    } else if (password.length < 6) {
      setErrors({ password: "Password must be 6 characters or more" });
    } else {
      setErrors({ password: "Confirm Password field must be the same as the Password field" });
    }
  };

  return (
    <>
      <div className="page-container">
        <div className="login-form-container">
          <div className=" form-wrapper">
            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <h1>Sign Up</h1>
              </div>
              {errors.length > 0 && (
                <div>
                  <div>
                    {errors.map((error, idx) => (
                      <div className='error-msg' key={idx}>{error}</div>
                    ))}
                  </div>
                </div>
              )}
              <div className="login-form-input-container">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="login-form-input-container">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="login-form-input-container">
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors?.email && <div className="error-msg">{errors.email}</div>}
              </div>
              <div className="login-form-input-container">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  />
                {errors?.username && <div className="error-msg">{errors.username}</div>}
              </div>
              <div className="login-form-input-container">
                <label>Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="login-form-input-container">
                <label>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="login-form-input-container">
                <label>State</label>
                <select
                  defaultValue=''
                  onChange={(e) => {setState(e.target.value)}}
                  required>
                    <option value='' disabled>
                      Please select an option...
                    </option>
                    {states.map(state => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>
              </div>
              <div className="login-form-input-container">
                <label>Latitude</label>
                <input
                  type="number"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  required
                />
                {errors?.lat && <div className="error-msg">{errors.lat}</div>}
              </div>
              <div className="login-form-input-container">
                <label>Longitude</label>
                <input
                  type="number"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  required
                />
                {errors?.lng && <div className="error-msg">{errors.lng}</div>}
              </div>
              <div className="login-form-input-container">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors?.password && <div className="error-msg">{errors.password}</div>}
              </div>
              <div className="login-form-input-container">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <button className="cart-button" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
