import { BsTelephone } from "react-icons/bs";
import { BiDockRight } from "react-icons/bi";
import { FaSistrix } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
export function Header({ contact }) {
  return (
    <div className="bg-white p-2 flex border-2 ">
      {contact && (
        <>
          <div className="flex items-center">
            <img src={contact.img} alt="" className="w-[40px]" />
            {contact.firstName} {contact.lastName}
          </div>
          <div className="flex ml-auto gap-6 place-items-center">
            <FaSistrix />
            <BsTelephone />
            <BiDockRight />
            <FaEllipsisV />
          </div>
        </>
      )}
    </div>
  );
}
