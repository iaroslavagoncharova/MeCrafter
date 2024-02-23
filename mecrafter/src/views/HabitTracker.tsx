import { useEffect, useState } from "react";
import { useHabit } from "../hooks/apiHooks";
import { useUserContext } from "../hooks/contextHooks";
import Calendar from "react-calendar";

const HabitTracker = () => {
  const { habits } = useHabit();
  const { user } = useUserContext();
  const [lastClickedDate, setLastClickedDate] = useState(() => {
    const storedDate = localStorage.getItem("lastClickedDate");
    return storedDate ? new Date(storedDate) : null;
  });
  const [isDisabled, setIsDisabled] = useState(
    localStorage.getItem("isDisabled") === "true"
  );
  const [completedDates, setCompletedDates] = useState<string[] | null>(
    JSON.parse(localStorage.getItem("completedDates") || "[]")
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habitLogs, setHabitLogs] = useState(0);
  let habit_description = null;


  if (user?.habit_id) {
    const habit = habits.find((habit) => habit.habit_id === user.habit_id);
    habit_description = habit?.habit_description;
  }

  const handleClick = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    if (
      !lastClickedDate ||
      lastClickedDate.toISOString().split("T")[0] !== currentDate
    ) {
      console.log("Mark today's status");
      setLastClickedDate(new Date(currentDate));
      setIsDisabled(true);
      setCompletedDates((prevCompletedDates: string[] | null) => [
        ...(prevCompletedDates || []),
        currentDate,
      ]);
    }
  };

  const isCompleted = (date: Date) => {
    return completedDates?.some((completedDate) => {
      const formattedCompletedDate = new Date(completedDate);
      return (
        date.getDate() === formattedCompletedDate.getDate() &&
        date.getMonth() === formattedCompletedDate.getMonth() &&
        date.getFullYear() === formattedCompletedDate.getFullYear()
      );
    });
  };

  useEffect(() => {
    if (lastClickedDate) {
      localStorage.setItem(
        "lastClickedDate",
        lastClickedDate.toISOString().split("T")[0]
      );
    }
    localStorage.setItem("isDisabled", isDisabled.toString());
    localStorage.setItem("completedDates", JSON.stringify(completedDates));
  }, [lastClickedDate, isDisabled, completedDates]);

  return (
    <div>
      <h1>Habit Tracker</h1>
      <h2>Welcome, {user?.username}!</h2>
      <h3>Your habit: {user?.habit_name ? user.habit_name : "None"}</h3>
      <h3>
        Habit description: {habit_description ? habit_description : "None"}
      </h3>
      <h3>
        Habit frequency: {user?.habit_frequency ? user.habit_frequency : "None"}{" "}
        {user?.habit_frequency === 1 ? "time" : "times"} a week
      </h3>
      <button
        className="btn btn-primary"
        onClick={handleClick}
        disabled={isDisabled}
      >
        I did it today!
      </button>
      <Calendar
        onClickDay={(date) => setSelectedDate(date)}
        tileContent={({ date }) => {
          date.toISOString().split("T")[0];
          return isCompleted(date) ? (
            <div className="completed-tile">✅</div>
          ) : null;
        }}
      />
      {habitLogs >= (user?.habit_frequency ?? 0) && (
        <p>
          Congratulations! You've reached your habit frequency goal for the
          week!
        </p>
      )}
    </div>
  );
};

export default HabitTracker;