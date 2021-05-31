import React from "react";
import ReactDOM from "react-dom";
import Login from "./login";
import Invite from "./invite";
import ReferalList from "./referal_list";
import Registration from "./registration";
import RegistrationNoReferal from "./register_no_referal";

if (document.getElementById("loginform")) {
    ReactDOM.render(<Login />, document.getElementById("loginform"));
} else if (document.getElementById("app")) {
    ReactDOM.render(<Invite />, document.getElementById("app"));
} else if (document.getElementById("referal_list")) {
    ReactDOM.render(<ReferalList />, document.getElementById("referal_list"));
} else if (document.getElementById("registration")) {
    ReactDOM.render(<Registration />, document.getElementById("registration"));
} else if (document.getElementById("registration_noreferal")) {
    ReactDOM.render(
        <RegistrationNoReferal />,
        document.getElementById("registration_noreferal")
    );
}
