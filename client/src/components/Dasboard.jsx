import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Character from "./Character";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [chars, setChars] = useState([]);
  const [inputs, setInputs] = useState({ char_name: "", realm: "" });

  const { char_name, realm } = inputs;

  const handleChange = () => {
    setShow(!show);
  };

  const removeChar = async (e, index) => {
    e.preventDefault();
    try {
      const body = chars[index];
      const response = await fetch(
        "https://friendly-whistler-38809.herokuapp.com/dashboard/removeChar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();
      console.log(parseRes);
      if (parseRes.rows) {
        toast.success("Removed character");
        setChars(chars.filter((_, i) => i !== index));
      } else {
        toast.error("Could not delete this character", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addChar = async (e) => {
    e.preventDefault();
    try {
      const body = { char_name, realm };
      const response = await fetch(
        "https://friendly-whistler-38809.herokuapp.com/dashboard/addChar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();
      console.log(parseRes);
      if (parseRes.user_id) {
        toast.success("Added to characters!");
        getChars();
      } else {
        toast.error("Already registered!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getName() {
    try {
      const response = await fetch(
        "https://friendly-whistler-38809.herokuapp.com/dashboard/",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      const parseRes = await response.json();

      setName(parseRes.user_name);
    } catch (error) {
      console.error(error.message);
    }
  }

  const onChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  async function getChars() {
    try {
      const response = await fetch(
        "https://friendly-whistler-38809.herokuapp.com/dashboard/chars",
        {
          headers: {
            token: localStorage.token,
            char_name: char_name,
            realm: realm,
          },
        }
      );
      const parseRes = await response.json();

      if (parseRes.rows) {
        setChars(parseRes.rows);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    getName();
    getChars();
  }, []);

  const submit = (e) => {};
  return (
    <Fragment>
      <Navbar online={true} logout={logout}></Navbar>
      <div
        className="container"
        style={{ marginTop: "7vh", minHeight: "93vh" }}
      >
        <h1 style={{}}>Hello {name} 👋</h1>
        <div style={{ display: "flex" }}>
          <h4
            style={{
              marginTop: "1em",
              fontWeight: "300",
              display: "inline-block",
            }}
          >
            {" "}
            Here are your characters:
          </h4>
          <div
            style={{
              marginLeft: "auto",
              marginTop: "auto",
              marginRight: "0.5em",
              display: "flex",
              position: "relative",
            }}
          >
            <div
              style={{
                backgroundColor: "green",
                borderRadius: "50%",
                width: "30px",
                color: "white",
                textAlign: "center",
                height: "26px",

                marginBottom: "0.5em",
                display: "inline-block",
                boxshadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
              }}
              onClick={handleChange}
            >
              +
            </div>
            {show ? (
              <div
                className="card"
                style={{
                  position: "absolute",
                  right: "0",
                  zIndex: 1,
                  display: "block",
                  marginTop: "1.5em",
                  width: "15em",
                }}
              >
                <form className="container" onSubmit={submit}>
                  <input
                    type="text"
                    name="char_name"
                    placeholder="name"
                    className="form-control my-3"
                    onChange={(e) => onChange(e)}
                    value={char_name}
                  />
                  <input
                    type="text"
                    name="realm"
                    placeholder="realm"
                    className="form-control my-3"
                    onChange={(e) => onChange(e)}
                    value={realm}
                  />
                  <button className="btn btn-dark btn-block" onClick={addChar}>
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <hr
          style={{
            border: "0",
            height: "0",
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            backgroundColor: "white",
            marginTop: "0",
            width: "100%",
          }}
        ></hr>

        <div
          className="row"
          style={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {chars.map((char, index) => {
            return (
              <Character
                key={char.name + char.realm}
                name={char.name}
                realm={char.ream}
                handleRemove={removeChar}
                index={index}
              ></Character>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
