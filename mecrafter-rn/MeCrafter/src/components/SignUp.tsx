// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import { useUser } from "../hooks/apiHooks";
// import { useForm, Controller } from "react-hook-form";
// // import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

// const SignUp = ({ onSuccess }: { onSuccess: () => void }) => {
//   const { postUser, getUsernameAvailability, getEmailAvailability } = useUser();
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState<boolean>(false);
//   const values = { username: "", password: "", confirmPassword: "", email: "" };
//   const { control, handleSubmit, setValue, inputs } = useForm({ defaultValues: values });
//   const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
//   const [emailAvailable, setEmailAvailable] = useState<boolean>(true);
//   const [passwordValid, setPasswordValid] = useState<boolean>(false);
//   const [passwordMatch, setPasswordMatch] = useState<boolean>(false);

//   const validatePassword = () => {
//     const isValid = inputs.password.length >= 8;
//     setPasswordValid(isValid && inputs.password === inputs.confirmPassword);
//   };

//   const validateConfirmPassword = () => {
//     const match = inputs.password === inputs.confirmPassword;
//     setPasswordMatch(match);
//   };

//   const register = async (data: any) => {
//     try {
//       if (!passwordValid) {
//         alert("Password must be at least 8 characters long");
//         return;
//       }
//       if (inputs.password !== inputs.confirmPassword) {
//         alert("Password and Confirm Password do not match");
//         return;
//       }

//       if (usernameAvailable && emailAvailable) {
//         await postUser({
//           username: inputs.username,
//           password: inputs.password,
//           email: inputs.email,
//         });
//         alert("User successfully created! You can sign in now");
//         onSuccess();
//       }
//     } catch (error) {
//       console.log((error as Error).message);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <View style={styles.signupFormContainer}>
//       <Text>Create an account to start tracking your habits</Text>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Username</Text>
//         <Controller
//           control={control}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 onBlur={onBlur}
//                 onChangeText={(text) => {
//                   onChange(text);
//                   handleUsernameChange(text);
//                 }}
//                 value={value}
//               />
//               {usernameAvailable ? (
//                 <FaCheckCircle style={styles.icon} />
//               ) : (
//                 <>
//                   <FaExclamationCircle style={styles.icon} />
//                   <Text style={styles.errorMessage}>Username not available</Text>
//                 </>
//               )}
//             </View>
//           )}
//           name="username"
//           rules={{ required: true }}
//         />
//       </View>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Email</Text>
//         <Controller
//           control={control}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 onBlur={onBlur}
//                 onChangeText={(text) => {
//                   onChange(text);
//                   handleEmailChange(text);
//                 }}
//                 value={value}
//               />
//               {emailAvailable ? (
//                 <FaCheckCircle style={styles.icon} />
//               ) : (
//                 <>
//                   <FaExclamationCircle style={styles.icon} />
//                   <Text style={styles.errorMessage}>Email not available</Text>
//                 </>
//               )}
//             </View>
//           )}
//           name="email"
//           rules={{ required: true, pattern: /^\S+@\S+$/i }}
//         />
//       </View>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Password</Text>
//         <Controller
//           control={control}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 onBlur={onBlur}
//                 secureTextEntry={!showPassword}
//                 onChangeText={(text) => {
//                   onChange(text);
//                   validatePassword();
//                 }}
//                 value={value}
//               />
//               {passwordValid ? (
//                 <FaCheckCircle style={styles.icon} />
//               ) : (
//                 <>
//                   <FaExclamationCircle style={styles.icon} />
//                   <Text style={styles.errorMessage}>Password must be at least 8 characters long</Text>
//                 </>
//               )}
//               <TouchableOpacity onPress={togglePasswordVisibility}>
//                 <Text>{showPassword ? "Hide" : "Show"}</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           name="password"
//           rules={{ required: true }}
//         />
//       </View>
//       <View style={styles.formGroup}>
//         <Text style={styles.label}>Confirm Password</Text>
//         <Controller
//           control={control}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 onBlur={onBlur}
//                 secureTextEntry={!showConfirmPassword}
//                 onChangeText={(text) => {
//                   onChange(text);
//                   validateConfirmPassword();
//                 }}
//                 value={value}
//               />
//               {passwordMatch ? (
//                 <FaCheckCircle style={styles.icon} />
//               ) : (
//                 <>
//                   <FaExclamationCircle style={styles.icon} />
//                   <Text style={styles.errorMessage}>Passwords do not match</Text>
//                 </>
//               )}
//               <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
//                 <Text>{showConfirmPassword ? "Hide" : "Show"}</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           name="confirmPassword"
//           rules={{ required: true }}
//         />
//       </View>
//       <TouchableOpacity
//         style={styles.signupButton}
//         onPress={handleSubmit(register)}
//         disabled={!usernameAvailable || !emailAvailable}
//       >
//         <Text style={styles.buttonText}>Signup</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SignUp;

import { View, Text } from 'react-native'
import React from 'react'

export default function SignUp() {
  return (
    <View>
      <Text>SignUp</Text>
    </View>
  )
}
