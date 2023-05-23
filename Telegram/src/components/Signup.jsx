import { useState } from "react";
import "./signup.css";
const strengthLabels = ["weak", "medium", "strong"];

const Signup = () => {
  const [user, setUser] = useState({
    id: crypto.randomUUID(),
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJJxavVQXHlKEamILZ2o62NKQEeqG_KIw28A&usqp=CAU",
    login: "",
    password: "",
  });

  const onUserInput = (key) => (e) => {
    setUser({
      ...user,
      [key]: e.target.value,
    });
  };
  // const contacts = [

  const onLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // выводим данные из ответа на консоль
        // здесь можно выполнить какие-либо действия, например, показать сообщение об успешной регистрации
      })
      .catch((error) => console.error(error));
  };
  const [strength, setStrength] = useState("");

  const getStrength = (password) => {
    console.log(password);

    let strengthIndicator = -1;

    let upper = false,
      lower = false,
      numbers = false;

    for (let index = 0; index < password.length; index++) {
      let char = password.charCodeAt(index);
      if (!upper && char >= 65 && char <= 90) {
        upper = true;
        strengthIndicator++;
      }

      if (!numbers && char >= 48 && char <= 57) {
        numbers = true;
        strengthIndicator++;
      }

      if (!lower && char >= 97 && char <= 122) {
        lower = true;
        strengthIndicator++;
      }
    }

    setStrength(strengthLabels[strengthIndicator] ?? "");
  };

  const handleChange = (event) => getStrength(event.target.value);

  return (
    <div className="login-card">
      <h2>Sign Up</h2>
      <form className="login-form">
        <div className="username">
          <input
            autoComplete="off"
            spellCheck="false"
            className="control"
            type="email"
            placeholder="Email"
            onChange={onUserInput("login")}
          />
          <div id="spinner" className="spinner"></div>
        </div>

        <input
          name="password"
          spellCheck="false"
          className="control"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            onUserInput("password")(e);
            handleChange(e);
          }}
        />

        <div className={`bars ${strength}`}>
          <div></div>
        </div>
        <div className="strength">{strength && <>{strength} password</>}</div>
        <button className="control" type="button" onClick={onLogin}>
          JOIN NOW
        </button>
      </form>
    </div>
  );
};

export default Signup;
