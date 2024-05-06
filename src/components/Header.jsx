import React from "react";
import { useContext } from "react";
import PocketBaseContext from "../pages/PocketBaseContext";

const Header = () => {
  const pb = useContext(PocketBaseContext);
  const firstName = pb.authStore.model.name.split(' ')[0];
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  let greetingMessage;
  let emoji;

  if (currentHour < 12) {
    greetingMessage = "Buenos días";
    emoji = "🌞";
  } else if (currentHour < 18) {
    greetingMessage = "Buenas tardes";
    emoji = "🌅";
  } else {
    greetingMessage = "Buenas noches";
    emoji = "🌙";
  }

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold">
        {emoji} {greetingMessage}, <span className="text-primary-100">{firstName}</span>
      </h1>
    </header>
  );
};

export default Header;