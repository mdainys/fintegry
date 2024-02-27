import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import ListOfUsers from "./components/ListOfUsers";

function App() {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    country: "",
    city: "",
    house: "",
    code: "",
  });
  const [userExists, setUserExists] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const handleSubmitManager = () => {
    setUser({
      name: "",
      surname: "",
      email: "",
      country: "",
      city: "",
      house: "",
      code: "",
    });
    setRegisteredSuccess(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserExists(false);
      setRegisteredSuccess(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [userExists, registeredSuccess]);

  return (
    <>
      <header>
        <div>
          <h1>Front end task</h1>
          <p className="read-the-docs">Create web application using React.</p>
          <p className="read-the-docs">Registration form.</p>
        </div>
      </header>
      <main>
        <section>
          <Form
            setUser={setUser}
            user={user}
            handleSubmitManager={handleSubmitManager}
            setUserExists={setUserExists}
            setRegisteredSuccess={setRegisteredSuccess}
          />

          {userExists && (
            <div className="error">User with this email already exists</div>
          )}
          {registeredSuccess && (
            <div className="user-registered">
              User has been registered successfully
            </div>
          )}
        </section>
        <section>
          <ListOfUsers user={user} />
        </section>
      </main>
    </>
  );
}

export default App;
