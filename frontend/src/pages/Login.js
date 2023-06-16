/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Layout/Spinner";
import { message } from "antd";

function Basicform() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allEntry, setAllEntry] = useState([]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (email && password) {
      const newEntry = { email, password };
      console.log(newEntry);
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:8080/api/v1/user/login",
          newEntry
        );

        if (response.status === 200) {
          // User found
          console.log(response.data);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...response.data.user, password: " " })
          );
          console.log(response.data);
          setAllEntry([...allEntry, newEntry]);
          setEmail("");
          setPassword("");
          message.success("Login successfully");
          navigate("/");
        } else {
          // User not found

          message.error("No user Found");
          // Handle the error case, e.g., show an error message to the user
        }
      } catch (error) {
        message.error("No user Found");

        // Handle the error case, e.g., show an error message to the user
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill all the data");
    }
  };
  //? prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="login-root">
        {loading && <Spinner />}
        <div
          className="box-root flex-flex flex-direction--column"
          style={{ minHeight: "100vh", flexGrow: 1 }}
        >
          <div className="loginbackground box-background--white padding-top--64">
            <div className="loginbackground-gridContainer">
              <div
                className="box-root flex-flex"
                style={{ gridArea: "top / start / 8 / end" }}
              >
                <div
                  className="box-root"
                  style={{
                    backgroundImage:
                      "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                    flexGrow: 1,
                  }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 2 / auto / 5" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "6 / start / auto / 2" }}
              >
                <div
                  className="box-root box-background--blue800"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "7 / start / auto / 4" }}
              >
                <div
                  className="box-root box-background--blue animationLeftRight"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "8 / 4 / auto / 6" }}
              >
                <div
                  className="box-root box-background--gray100 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "2 / 15 / auto / end" }}
              >
                <div
                  className="box-root box-background--cyan200 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "3 / 14 / auto / end" }}
              >
                <div
                  className="box-root box-background--blue animationRightLeft"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 17 / auto / 20" }}
              >
                <div
                  className="box-root box-background--gray100 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "5 / 14 / auto / 17" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
            </div>
          </div>
          <div
            className="box-root padding-top--24 flex-flex flex-direction--column"
            style={{ flexGrow: 1, zIndex: 9 }}
          >
            <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
              <h1>
                <a href="/" rel="dofollow">
                  Expenss Tracker
                </a>
              </h1>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  <span className="padding-bottom--15">
                    Sign in to your account
                  </span>
                  <form action=" " onSubmit={submitForm} id="stripe-login">
                    <div className="field padding-bottom--24">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="field padding-bottom--24">
                      <div className="grid--50-50">
                        <label htmlFor="password">Password</label>
                        <div className="reset-pass">
                          <a href="/">Forgot your password?</a>
                        </div>
                      </div>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="field padding-bottom--24">
                      <input type="submit" name="submit" value="Continue" />
                    </div>
                  </form>
                </div>
              </div>
              <div className="footer-link padding-top--24">
                <span>
                  Don't have an account? <Link to="/register">Sign up</Link>
                </span>
                <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                  <span>
                    <a href="/">© Akash Kumar Nandi</a>
                  </span>
                  <span>
                    <a href="/">Contact</a>
                  </span>
                  <span>
                    <a href="/">Privacy & terms</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {allEntry.length > 0 &&
          allEntry.map((cur, index) => {
            const { email, password } = cur;
            return (
              <div key={index} className="showDetails">
                <p>{email}</p>
                <p>{password}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Basicform;
