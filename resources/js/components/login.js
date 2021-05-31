import React, { useState } from "react";
import Axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginConfig = {
        method: "post",
        url: "/login",
        data: {
            email: email,
            password: password,
        },
    };

    const login = async () => {
        const { data } = await Axios(loginConfig);
        if (data.message == "error") {
            alert(data.error);
        } else {
            if (data.user.role_id == 1) {
                window.location.replace("/admin/referals");
            } else {
                window.location.replace("/user/invite");
            }
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center mx-auto ">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        login();
                    }}
                >
                    <div className="row w-75 mx-auto mt-5">
                        <h1 className="mb-5">Login Here</h1>

                        <div className="form-group w-100">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group w-100">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className="form-control "
                                placeholder="Password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                        <a
                            href="/register"
                            className="btn btn-link"
                            style={{ fontSize: "16px" }}
                        >
                            No Account ? Sign Up Here
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
