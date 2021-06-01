import React from "react";
import { dateDifferenceMinute, golas } from "../utils/functions";

const EventTime = ({ time, id, gameTime }) => {
  var gameResult = {};
  gameResult = golas(id);
  const checkEvent = (eventyType, id) => {
    for (let i = 0; i < gameResult.events.length; i++) {
      if (gameResult.events[i].eventType === eventyType)
        return gameResult.events[i];
    }
    return false;
  };

  const currentEventMinute = () => {
    if (
      !checkEvent("halftime_end", id) ||
      (checkEvent("halftime_end", id) && !checkEvent("halftime_start", id))
    ) {
      return dateDifferenceMinute(time, gameTime);
    }
    if (checkEvent("halftime_end", id) && checkEvent("halftime_start", id)) {
      const halftimeStart = checkEvent("halftime_start", id);

      const current = dateDifferenceMinute(time, halftimeStart.time);

      return current + 45;
    }
  };
  return <span>{currentEventMinute()}</span>;
};

export default EventTime;
