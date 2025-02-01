import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Signup() {

  const navigate = useNavigate();

  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [type]: e.target.value
    })
  }

  const getErrors = (): string[] => {
    const errors = [];
    if (!formState.name) errors.push("Name required");
    if (!formState.email) {
      errors.push("Email required");
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      errors.push("Invalid email");
    }
    if (!formState.password) errors.push("Password required");
    return errors;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const errors = getErrors();

    for (let error of errors) {
      alert(error);
    }

    if (errors.length) return;

    const response = await fetch('http://localhost/api/v1/register', {
      method: "post",
      headers: {
        // needed so express parser says the body is OK to read
        'User-Agent': 'PostmanRuntime/7.43.0',
        'Content-Type': 'application/json',
        'Accept' : '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      },
      body: JSON.stringify({
        name: formState.name,
        email: formState.email,
        password: formState.password
      })
    }).then(response => { if (response) return response.json(); })
    .catch(error=>{console.log(error); return  alert("Something went wrong.");})
    .finally(()=>console.log("FINISH"));

    if (response && response.message && response.message == "User Created ") {
      navigate("/auth/check-your-email");
    }

    if (response && response.message) {
        return alert(response.message);
    }

    // TODO: add more for error validation
    if (!response || !response.message || response.status !== 200) {
      // TODO: Add more detailed error handling.
      return alert("Something went wrong.");
    }

  }


  return (
    <div>
      <header>
        <div>
          <div>
            <Link className="App-link" to="/">Back</Link>
          </div>
          <div>
            <h1>Sign up</h1>
            <form onSubmit={onSubmit}>
              <div>
                <label>Name</label>
                <input onChange={(e) => onChange(e, "name")} type="text" value={formState.name} />
              </div>
              <div>
                <label>Email</label>
                <input onChange={(e) => onChange(e, "email")} type="email" value={formState.email} />
              </div>
              <div>
                <label>Password</label>
                <input onChange={(e) => onChange(e, "password")} type="password" value={formState.password} />
              </div>
              <button type="submit">Submit</button>
            </form>
            <div>
              <Link to="/auth/login">Already have an account? Log in</Link>
            </div>
            <div>
              <Link to="/">Back to home</Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
export default Signup;