import * as FaIcons from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

// function personAge(value) {
//   let currentYear = new Date().getFullYear();
//   let birthYear = new Date(value).getFullYear();
//   let age = currentYear - birthYear;
//   return age;
// }

function TodayBirthdays({ handleDelete, today }) {
  const date = new Date(today.birthday);
  const birthMonth = date.toLocaleString("default", { month: "long" });
  const birthday = new Date(today.birthday).getDate();

  const data = {
    timezone: "Africa/Lagos", // Africa/Lagos,
    to: "michaelogbo@outlook.com",
    from: "noreply@gmail.com",
    date: {
      day: today.birthday,
    },
    name: today.name, // receiver name
    sender: "", // sender name
  };
  addDoc(collection(db, "birthdays"), data);

  return (
    <ul>
      <li>
        <div className="grid">
          <img
            src={
              today.img
                ? today.img
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt={today.name}
          />
          <div className="title">
            <h3 className="name">{today.name}</h3>
            <p className="monthDay">
              {birthMonth} {birthday}
            </p>
          </div>
          <FaIcons.FaTimes
            className="icons"
            onClick={() => handleDelete(today.id)}
          />
        </div>
      </li>
    </ul>
  );
}

export default TodayBirthdays;
