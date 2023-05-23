import { useEffect, useState } from "react";
import { ContactList } from "./components/ContactList";
import { Header } from "./components/Header";
import { MessageList } from "./components/MessageList";
import Signup from "./components/Signup";

function App() {
  const [contacts, setContacts] = useState([]);
  const [choosenContact, setChoosenContact] = useState();
  const [isLocked, setIsLocked] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/contacts`);
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);
  const onContactClick = (id) => {
    const selectedContact = contacts.find((contact) => contact.id === id);
    if (selectedContact != null) {
      setChoosenContact(selectedContact);
    }
  };

  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "1234") {
      setIsLocked(false);
    } else {
      alert("Kod Nepravilniy");
    }
    setPassword("");
  };
  return (
    <div className="flex w-[80%] m-auto  border-2">
      {user ? (
        <>
          {isLocked ? (
            <div className="fixed inset-0 bg-white  flex justify-center pt-[250px] border-2 w-[80%] m-auto">
              <form
                onSubmit={handleSubmit}
                className="flex flex-wrap w-[220px] justify-center text-center h-1"
              >
                <label className="font-bold py-2 px-4  rounded">
                  Введите код-доступа
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" focus:outline-none border-b-4 border-indigo-500 border"
                  />
                </label>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4  border-b-4 border-blue-700 hover:border-blue-500 rounded"
                >
                  Потвердить
                </button>
              </form>
            </div>
          ) : (
            <>
              <ContactList
                contacts={contacts}
                user={user}
                onContactClick={onContactClick}
                setIsLocked={setIsLocked}
                isLocked={isLocked}
              />
              <div style={{ width: "100%" }}>
                <Header contact={choosenContact} />
                <MessageList contact={choosenContact} user={user} />
              </div>
            </>
          )}
        </>
      ) : (
        <Signup />
      )}
    </div>
  );
}

export default App;
