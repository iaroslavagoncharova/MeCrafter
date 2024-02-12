import { useUser } from "../hooks/apiHooks";
import { useForm } from "../hooks/formHooks";

const SignUp = ({onSuccess}: {onSuccess: () => void}) => {
  const { postUser } = useUser();

  const values = { username: "", password: "", email: "" };

  const register = async () => {
    try {
      console.log(inputs);
      const postResult = await postUser(
        inputs as { username: string; password: string; email: string }
      );
      console.log(postResult);
      alert('User successfully created! You can sign in now')
      onSuccess();
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(register, values);

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
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signuppassword">Password</label>
          <input
            type="password"
            id="signuppassword"
            name="password"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignUp;
