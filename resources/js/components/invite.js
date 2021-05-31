import React, { useState, useReducer } from "react";
import Axios from "axios";
import { data } from "jquery";

const UserEmail = (state, action) => {
    switch (action.type) {
        case "ADD_DATA":
            var oldState = [...state];
            var newState = oldState.map((el, i) => {
                if (action.attrib.index == i) {
                    el["error_message"] = action.attrib.is_error;
                    el["email"] = action.attrib.value;
                    console.log(action.attrib.is_error);
                    return el;
                }
                return el;
            });
            return newState;
            break;
        case "ADD_NEWEMAIL":
            var oldState = [...state];
            oldState.push({
                id: action.attrib.id + 1,
                email: "",
                error_message: "",
                is_check: true,
            });
            return oldState;
            break;

        case "SET_ERROR_MESSAGE":
            var oldState = [...state];
            var email = action.attrib.email;
            var err_message = action.attrib.error_message;
            var id = action.attrib.id;
            console.log(action.attrib);
            var newState = oldState.map((el, i) => {
                if (id == i) {
                    el["error_message"] = err_message;
                    return el;

                    return el;
                }

                return el;
            });
            return newState;
            break;
        case "REMOVE_EMAIL":
            var oldState = [...state];
            oldState.splice(action.attrib.index, 1);
            return oldState;
            break;
        default:
            return state;
            break;
    }
};

function Invite() {
    const [errors, setErrors] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const user_email_init = {
        id: 0,
        email: "",
        error_message: "",
        is_check: true,
    };

    function emailValidate(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return re.test(email);
    }

    const [user_email, userEmailReducer] = useReducer(UserEmail, [
        {
            ...user_email_init,
        },
    ]);

    const inviteEmailConfig = {
        method: "post",
        url: "/add-email",
        data: {
            email: user_email,
        },
    };

    const inviteEmail = async () => {
        setSpinner(true);
        const { data } = await Axios(inviteEmailConfig);
        setSpinner(false);
        console.log(data);
    };

    const addEMailToListConfig = {
        method: "post",
        url: "/add-email-to-list",
        data: {
            email: user_email,
        },
    };

    console.log(user_email);

    const addEMailToList = async (btn) => {
        const { data } = await Axios(addEMailToListConfig);
        if (data.message == "success") {
            if (btn == "add_more") {
                userEmailReducer({
                    type: "ADD_NEWEMAIL",
                    attrib: {
                        id: user_email[user_email.length - 1].id,
                    },
                });

                setErrors(null);
            }
        } else {
            userEmailReducer({
                type: "SET_ERROR_MESSAGE",
                attrib: {
                    email: data.email.email,
                    id: data.email.id,
                    error_message: data.errors.email[0],
                },
            });
            setErrors(data.errors);
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
            <div className="row w-75 mx-auto mt-5">
                <h1 className="mb-5">Invite Friends</h1>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Enter Email Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user_email.length
                            ? user_email.map((el, i) => {
                                  return (
                                      <tr key={i}>
                                          <td className="align-middle">
                                              <div className="form-group w-100">
                                                  <input
                                                      type="email"
                                                      className="text-center"
                                                      value={el.email}
                                                      onChange={(e) => {
                                                          userEmailReducer({
                                                              type: "ADD_DATA",
                                                              attrib: {
                                                                  value: e
                                                                      .target
                                                                      .value,
                                                                  index: i,
                                                                  is_error:
                                                                      !emailValidate(
                                                                          e
                                                                              .target
                                                                              .value
                                                                      ),
                                                              },
                                                          });
                                                      }}
                                                      className={`form-control ${
                                                          el.is_error == true &&
                                                          el.value != ""
                                                              ? "border-danger"
                                                              : ""
                                                      }`}
                                                      placeholder="Enter email"
                                                  />
                                                  {el.error_message != "" ? (
                                                      <small className="form-text text-danger">
                                                          {displayError(
                                                              "email"
                                                          )}
                                                      </small>
                                                  ) : (
                                                      ""
                                                  )}
                                              </div>
                                          </td>
                                          <td className="align-middle">
                                              {user_email.length > 1 ? (
                                                  <div className="form-group w-100">
                                                      <button
                                                          className="btn btn-danger text-center"
                                                          onClick={(e) => {
                                                              userEmailReducer({
                                                                  type: "REMOVE_EMAIL",
                                                                  attrib: {
                                                                      index: i,
                                                                  },
                                                              });
                                                          }}
                                                      >
                                                          Delete
                                                      </button>
                                                  </div>
                                              ) : (
                                                  ""
                                              )}
                                          </td>
                                      </tr>
                                  );
                              })
                            : ""}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={(e) => {
                                        addEMailToList("add_more");
                                    }}
                                >
                                    Add More Email
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>

                <div className="mx-auto">
                    <button
                        type="button"
                        onClick={(e) => {
                            addEMailToList("submit");
                            if (spinner == false) {
                                inviteEmail();
                            }
                        }}
                        disabled={spinner}
                        className="btn btn-success"
                    >
                        {spinner ? (
                            <span>
                                <span
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                &nbsp; Loading
                            </span>
                        ) : (
                            "Invite"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Invite;
