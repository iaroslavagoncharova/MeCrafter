import { useState } from "react";
import { useUser } from "../hooks/apiHooks";
import { useForm } from "../hooks/formHooks";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const SignUp = ({ onSuccess }: { onSuccess: () => void }) => {
  const { postUser } = useUser();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
  const [emailAvailable, setEmailAvailable] = useState<boolean>(true);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(false);

  const values = { username: "", password: "", confirmPassword: "", email: "" };

  const validatePassword = () => {
    const isValid = inputs.password.length >= 7;
    setPasswordValid(isValid && inputs.password === inputs.confirmPassword);
  };

  
  const validateConfirmPassword = () => {
    const match = inputs.password === inputs.confirmPassword;
    setPasswordMatch(match);
  };

  const register = async () => {
    try {
      if (!passwordValid) {
        alert("Password must be at least 8 characters long");
        return;
      }
      if (inputs.password !== inputs.confirmPassword) {
        alert("Password and Confirm Password do not match");
        return;
      }

      if (usernameAvailable && emailAvailable) {
        await postUser({
          username: inputs.username,
          password: inputs.password,
          email: inputs.email,
        });
        alert("User successfully created! You can sign in now");
        onSuccess();
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(register, values);

  const { getUsernameAvailability, getEmailAvailability } = useUser();

  const handleUsernameChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.currentTarget.value === "") {
      setUsernameAvailable(false);
      return;
    }
    handleInputChange(event);
    const result = await getUsernameAvailability(event.currentTarget.value);
    setUsernameAvailable(result.available);
  };

  const handleEmailChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.currentTarget.value === "") {
      setEmailAvailable(false);
      return;
    }
    handleInputChange(event);
    const result = await getEmailAvailability(event.currentTarget.value);
    setEmailAvailable(result.available);
  };

  console.log(usernameAvailable, emailAvailable);

  return (
    <div id="signup-form" className="col justify-content-center">
      <p>Create an account to start tracking your habits</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="signupusername">Username</label>
          <input
            type="text"
            id="signupusername"
            name="username"
            autoComplete="username"
            onChange={handleInputChange}
            onBlur={handleUsernameChange}
          />
          {usernameAvailable ? (
            <FaCheckCircle style={{ color: "green", marginLeft: "5px" }} />
          ) : (
            <>
              <FaExclamationCircle
                style={{ color: "red", marginLeft: "5px" }}
              />
              <p style={{ color: "red" }}>Username not available</p>
            </>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            onChange={handleInputChange}
            onBlur={handleEmailChange}
          />
          {emailAvailable ? (
            <FaCheckCircle style={{ color: "green", marginLeft: "5px" }} />
          ) : (
            <>
              <FaExclamationCircle
                style={{ color: "red", marginLeft: "5px" }}
              />
              <p style={{ color: "red" }}>Email not available</p>
            </>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="signuppassword">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="signuppassword"
            name="password"
            autoComplete="new-password"
            onChange={handleInputChange}
            onBlur={validatePassword}
          />
          {passwordValid ? (
            <FaCheckCircle style={{ color: "green", marginLeft: "5px" }} />
          ) : (
            <>
            <FaExclamationCircle style={{ color: "red", marginLeft: "5px" }} />
            <p style={{ color: "red" }}>Password must be at least 8 characters long</p>
            </>
          )}
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            onChange={handleInputChange}
            onBlur={validateConfirmPassword}
          />
          {passwordMatch ? (
            <FaCheckCircle style={{ color: "green", marginLeft: "5px" }} />
          ) : (
            <>
            <FaExclamationCircle style={{ color: "red", marginLeft: "5px" }} />
            <p style={{ color: "red" }}>Passwords do not match</p>
            </>
          )}
          <button type="button" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!usernameAvailable || !emailAvailable}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignUp;
