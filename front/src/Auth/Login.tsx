import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
    const navigate = useNavigate(); const [formState, setFormState] = React.useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        e.preventDefault();
        setFormState({
            ...formState,
            [type]: e.target.value
        })
    }

    const getErrors = (): string[] => {
        const errors = [];
        if (!formState.email) {
            errors.push("Email required");
        } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
            errors.push("Invalid email");
        }
        if (!formState.password) errors.push("Password required");
        return errors;
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        console.log("submit", formState);

        // setMessage("");
        setLoading(true);

        e.preventDefault();

        const errors = getErrors();

        // console.log(errors);

        for (let error of errors) {
            alert(error);
        }

        if (errors.length) return;

        var response = await fetch('http://localhost/api/v1/login', {
            method: "post",
            headers: {
                // needed so express parser says the body is OK to read
                'User-Agent': 'PostmanRuntime/7.43.0',
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },
            body: JSON.stringify({
                email: formState.email,
                password: formState.password
            })
        }).then(response => { if (response) return response.json(); })
            .catch(error => { console.log(error); return alert("Something went wrong."); })
            .finally(() => { console.log("FINISH"); setLoading(false); });

        // console.log('resMessage', message);
        // console.log('response', response);

        if (!response) {
            // TODO: Add more detailed error handling.
            return alert("Something went wrong.");
        }

        if (response && response.access_token) {
            sessionStorage.setItem('accessToken', response.access_token);
            navigate("/dashboard");
            // return <Navigate to="/dashboard" state={{ todos: [] }} replace={true} />
            return;
        }

        // TODO: add more for error validation
        if (!response.status || response.status !== 200) {
            // TODO: Add more detailed error handling.
            return alert("Something went wrong.");
        }

        if (response && response.message) {
            return alert(response.message);
        }

    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <div>
                        <Link className="App-link" to="/">Back</Link>
                    </div>
                    <div>
                        <h1>Log in</h1>
                        <form onSubmit={onSubmit}>
                            <div>
                                <label>Email</label>
                                <input onChange={(e) => onChange(e, "email")} type="email" value={formState.email} />
                            </div>
                            <div>
                                <label>Password</label>
                                <input onChange={(e) => onChange(e, "password")} type="password" value={formState.password} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Login</span>
                                </button>
                            </div>
                        </form>
                        <div>
                            <Link to="/auth/signup">Don't have an account? Sign up</Link>
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
export default Login;