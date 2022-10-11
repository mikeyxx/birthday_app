import * as FaIcons from "react-icons/fa";

// function personAge(value) {
//   let currentYear = new Date().getFullYear();
//   let birthYear = new Date(value).getFullYear();
//   let age = currentYear - birthYear;
//   return age;
// }

function UpcomingBirthdays({ handleDelete, person }) {
  const UpcomingBirthdayColor = true;
  const future = UpcomingBirthdayColor ? { backgroundColor: "#ffe66d" } : {};
  const date = new Date(person.birthday);
  const birthMonth = date.toLocaleString("default", { month: "long" });
  const birthday = new Date(person.birthday).getDate();

  return (
    <ul>
      <li>
        <div className="grid" style={future}>
          <img
            src={
              person.img
                ? person.img
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt={person.name}
          />
          <div className="title">
            <h3 className="name">{person.name}</h3>
            <p className="monthDay">
              {birthMonth} {birthday}
            </p>
          </div>
          <FaIcons.FaTimes
            className="icons"
            onClick={() => handleDelete(person.id)}
          />
        </div>
      </li>
    </ul>
  );
}

export default UpcomingBirthdays;
