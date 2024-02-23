// import React, { createContext } from "react";
// import { HabitContextType } from "../types/LocalTypes";
// import { useHabit } from "../hooks/apiHooks";
// import { useNavigate } from "react-router-dom";

// const HabitContext = createContext<HabitContextType | null>(null);

// const HabitProvider = ({ children }: { children: React.ReactNode }) => {
//   const navigate = useNavigate();

//   const { postHabit } = useHabit();

//   const { postFrequency } = useHabit();

//   const handleAddHabit = async (habit: Record<string, string>) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         await postHabit(habit, token);
//         navigate("/");
//       }
//     } catch (error) {
//       alert("Invalid credentials");
//     }
//   };

//   const handleAddFrequency = async (frequency: Record<string, string>) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         await postFrequency(frequency, token);
//         navigate("/");
//       }
//     } catch (error) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <HabitContext.Provider value={{ handleAddHabit, handleAddFrequency }}>
//       {children}
//     </HabitContext.Provider>
//   );
// };
// export { HabitProvider, HabitContext };
