import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAsyncAction,
  deleteUserAsyncAction,
  getUserDetailsAction,
  updateUserAsyncAction,
} from "../store/slices/userSlice";

const User = () => {
  const [userDetails, setUserDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [isEdit, setIsEdit] = useState(false);

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
    dispatch(addUserAsyncAction(userDetails));
    hanldeClear()
  };
  const handleDelete = (usr) => {
    dispatch(deleteUserAsyncAction(usr));
  };
  const editUser = (usr) => {
    setUserDetails(usr);
    setIsEdit(true);
  };
  const handleUpdate=()=>{
    dispatch(updateUserAsyncAction(userDetails));
    hanldeClear();
    setIsEdit(false)
  }

  const hanldeClear = ()=>{
    setUserDetails({
      fname: "",
      lname: "",
      email: "",
      password: "",
    })
  }
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

            {isEdit ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update User
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Add User
              </button>
            )}
          </form>
        </div>
        <div className="col-8">
          <table className="table">
            <thead>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>Email</th>
                <th>Password</th>
                <th>ID</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {mainUsers.map((usr) => (
                <tr>
                  <td>{usr.fname}</td>
                  <td>{usr.lname}</td>
                  <td>{usr.email}</td>
                  <td>{usr.password}</td>
                  <td>{usr.id}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        editUser(usr);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(usr);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
