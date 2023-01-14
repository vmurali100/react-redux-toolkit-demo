import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAsyncAction,
  getUserDetailsAction,
} from "../store/slices/userSlice";

const User = () => {
  const [userDetails, setUserDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { mainUsers } = useSelector((state) => state.users);
  console.log(mainUsers);
  useEffect(() => {
    dispatch(getUserDetailsAction());
  }, []);

  const handleChange = (e) => {
    let newUser = { ...userDetails };
    newUser[e.target.name] = e.target.value;
    setUserDetails(newUser);
  };
  const handleSubmit = () => {
    console.log(userDetails);
    dispatch(addUserAsyncAction(userDetails));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                name="fname"
                value={userDetails.fname}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                name="lname"
                value={userDetails.lname}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userDetails.email}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={userDetails.password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add User
            </button>
          </form>
        </div>
        <div className="col-8">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Email</th>
                <th>Password</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {mainUsers.map((usr)=> <tr>
                <td>{usr.fname}</td>
                <td>{usr.lname}</td>
                <td>{usr.email}</td>
                <td>{usr.password}</td>
                <td>{usr.id}</td>
              </tr> )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
