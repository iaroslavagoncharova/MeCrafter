import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
// import { HabitContext } from '../contexts/HabitContext';

const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within an UserProvider');
    }

    return context;
};

// const useHabitContext = () => {
//     const context = useContext(HabitContext);
//     if (!context) {
//         throw new Error('useHabitContext must be used within an HabitProvider');
//     }

//     return context;
// }

export { useUserContext };