import { RiGroupLine } from "react-icons/ri";
import { BsFillMoonFill } from "react-icons/bs";
import { FcBusinessContact, FcCallback, FcSettings } from "react-icons/fc";
import { GrUnlock, GrLock, GrChannel, GrSave } from "react-icons/gr";
import { useState } from "react";

export function ContactList({
  contacts,
  onContactClick,
  user,
  setIsLocked,
  isLocked,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredContactsBySearch = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  console.log(user);
  const handleLockToggle = () => {
    setIsLocked((isLocked) => !isLocked);
  };

  return (
    <div className="w-[30%] justify-around scrolling-touch overflow-auto h-[100vh]">
      <div>
        <div className="bg-white p-4 flex items-center">
          <div className="flex items-center">
            <button
              className="block text-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  className={`${isMenuOpen ? "hidden" : ""}`}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm16 6H4v2h16v-2z"
                />
                <path
                  className={`${isMenuOpen ? "" : "hidden"}`}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 9h14v2H5V9zm0 6h14v2H5v-2z"
                />
              </svg>
            </button>
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Поиск контактов"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mr-2 "
              autoFocus
            />
            <button onClick={() => handleLockToggle()}>
              {isLocked ? <GrLock /> : <GrUnlock />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="bg-white p-3 h-[100vh] ">
            <div className="flex flex-wrap items-center mb-4 rounded-full">
              <img
                src={user.img}
                alt=""
                className="w-[50px] rounded-full  mr-2"
              />
              <div>
                <p className="text-gray-500">{user.login}</p>
              </div>
            </div>
            <div className="flex flex-wrap w-[100%]">
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 w-[100%]"
              >
                <div className="w-[100%] flex">
                  <RiGroupLine /> <h1>Создать группу</h1>
                </div>
              </a>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 w-[100%]"
              >
                <div className="w-[100%] flex">
                  <GrChannel /> <h1>Создать канал</h1>
                </div>
              </a>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 w-[100%]"
              >
                <div className="w-[100%] flex">
                  <FcBusinessContact /> <h1>Контакты</h1>
                </div>
              </a>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 w-[100%]"
              >
                <div className="w-[100%] flex">
                  <FcCallback /> <h1>Звонки</h1>
                </div>
              </a>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 w-[100%]"
              >
                <div className="w-[100%] flex">
                  <GrSave /> <h1>Избранное</h1>
                </div>
              </a>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 w-[100%]"
              >
                <div className="w-[100%] flex">
                  <FcSettings /> <h1>Настройки</h1>
                </div>
              </a>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 w-[100%]"
              >
                <div className="w-[100%] flex">
                  <BsFillMoonFill /> <h1>Ночной режим</h1>
                </div>
              </a>
            </div>
          </div>
        )}

        {filteredContactsBySearch.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onContactClick(contact.id)}
            className="bg-white p-3"
          >
            <div className="hover:bg-slate-200 flex items-center">
              <img src={contact.img} alt="" className="w-[50px]" />
              {contact.firstName} {contact.lastName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
