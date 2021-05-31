import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Registration() {
    const getTokeCode = window.location.href.split("/")[5];
    const getUserId = window.location.href.split("/")[4];
    const [data, setData] = useState([]);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState(null);
    const getRegistrationConfig = {
        url: "/get-registration",
        method: "post",
        data: {
            user_id: getUserId,
            token: getTokeCode,
        },
    };

    const getRegistration = async () => {
        const { data, status } = await Axios(getRegistrationConfig);
        if (data != null) {
            console.log(data);
            setEmail(data.email);
        }
        setData(data);
        console.log(data);
    };

    useEffect(() => {
        getRegistration();
    }, []);

    const registerConfig = {
        url: "/sign-up",
        method: "post",
        data: {
            name: name,
            password: password,
            email: email,
            password_confirmation: confirm_password,
            user: data,
            with_token: "yes",
        },
    };

    const register = async () => {
        const { data } = await Axios(registerConfig);
        if (data.message == "error") {
            setErrors(data.errors);
        } else {
            window.location.replace("/user/invite");
        }
    };

    const displayError = (key) => {
        var err = null;
        if (errors != null) {
            if (key in errors) {
                err = errors[key][0];
            }
        }

        return err;
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center mx-auto ">
                <div className="row w-75 mx-auto mt-5">
                    <h1>Register Here</h1>
                    <div className="form-group w-100">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control "
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            placeholder="Password"
                        />
                        {displayError("name") != "" ? (
                            <small
                                id="emailHelp"
                                className="form-text text-danger"
                            >
                                {displayError("name")}
                            </small>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="form-group w-100">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            placeholder="Enter email"
                        />
                        {displayError("email") != "" ? (
                            <small
                                id="emailHelp"
                                className="form-text text-danger"
                            >
                                {displayError("email")}
                            </small>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="form-group w-100">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        {displayError("password") != "" ? (
                            <small
                                id="emailHelp"
                                className="form-text text-danger"
                            >
                                {displayError("password")}
                            </small>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="form-group w-100">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control "
                            placeholder="Password"
                            value={confirm_password}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                        {displayError("password_confirmation") != "" ? (
                            <small
                                id="emailHelp"
                                className="form-text text-danger"
                            >
                                {displayError("password_confirmation")}
                            </small>
                        ) : (
                            ""
                        )}
                    </div>

                    <button
                        type="submit"
                        onClick={(e) => {
                            register();
                        }}
                        className="btn btn-primary"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}
