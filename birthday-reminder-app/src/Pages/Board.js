import React, { useContext } from "react";
import ImgContext from "../context/ImgContext";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

import Button from "../Components/Button";
import Logout from "../Components/Logout";
import BirthdayIcon from "../Components/BirthdayIcon";
import TodayBirthdays from "../Components/TodayBirthdays";
import UpcomingBirthdays from "../Components/UpcomingBirthdays";

import { useEffect } from "react";

const Board = () => {
  const { data, setData } = useContext(ImgContext);
  let now = Today(data);
  let later = upcoming(data);
  const num = Today(data).length;
  const numOfBirthday = num === 1 ? "birthday today" : "birthdays today";

  useEffect(() => {
    // const fetchData = async () => {
    //
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push(doc.data());
    //     });
    //     setData(list);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchData();

    // Listen (Realtime)

    const unsub = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button />
      <Logout />
      <BirthdayIcon />
      <main className="wrap">
        <div className="board">
          <h2 className="tag">
            {num} {numOfBirthday}
          </h2>
          {now?.map((today) => {
            return (
              <TodayBirthdays
                key={today?.id}
                today={today}
                handleDelete={handleDelete}
              />
            );
          })}

          <h2 className="tag">upcoming</h2>
          {later?.map((person) => {
            return (
              <UpcomingBirthdays
                key={person?.id}
                person={person}
                handleDelete={handleDelete}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Board;

// Today's birthday(s)

function Today(person) {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();

  let filter = person?.filter((data) => {
    const personDay = new Date(data?.birthday).getDate();
    const personMonth = new Date(data?.birthday).getMonth();

    return currentDay === personDay && currentMonth === personMonth;
  });

  return filter;
}

// Upcoming birthdays

function upcoming(person) {
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  let filter = person?.filter((data) => {
    const month = new Date(data?.birthday).getMonth();
    const day = new Date(data?.birthday).getDate();

    if (day === currentDay) {
      return;
    } else {
      return month <= currentMonth || month >= currentMonth;
    }
  });

  return filter;
}
