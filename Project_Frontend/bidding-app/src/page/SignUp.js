import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupLottie from "./SignupLottie";

function SignUp() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const navigate = useNavigate();
  
  const handleFirstNameChange = (e) => {
    setFirstname(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const addCustomer = (e) => {
    const customer = {
      firstName,
      lastName,
      age,
      email,
      password,
      confirmPassword,
      phoneNumber,
    };

    //for checking the age of product
    if (customer.age < 18) {
      alert(
        "You are not eligible to buy this item, please enter the valid age"
      );
    }
    //if password and confirm password should same
    if (customer.password !== customer.confirmPassword) {
      alert(
        "Passwords do not match. Please make sure they match before submitting."
      );
      return;
    }

    if (firstName.trim() === "" || lastName.trim() === "") {
      alert("First Name and Last Name cannot be blank.");
      return;
    }

    if (!firstName.match(/^[a-zA-Z]+$/)) {
      alert("no numbers allowed in first name");
      return;
    }

    if (!lastName.match(/^[a-zA-Z]+$/)) {
      alert("no numbers allowed in last name");
      return;
    }

    if (!email.match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z]{2,}$/)) {
      alert("Invalid email format. Please enter a valid email address");
      return;
    }

    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      alert(
        "password should have atleast 1 LowerCase,1 UpperCase, 1 Digit,1 special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert(
        "Passwords do not match. Please make sure they match before submitting."
      );
      return;
    }

    alert(JSON.stringify(customer));
    console.log(customer);

    // CustomerServices.create(customer)
    axios
      .post("http://localhost:8080/api/auth/register", customer)
      .then((response) => {
        alert("customer added successfully");
        // console.log("customer added", response.data);
        navigate("/login");
      })
      .catch((error) => {
        alert("Error ");
        console.log("error", error.response);
      });
  };

  return (
    <>
      <div className="flex h-screen ">
        <div className="w-1/2">
          <SignupLottie></SignupLottie>
        </div>
        <div className=" w-1/2 flex justify-center items-center flex-col ">
          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:black"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="bg-grey-100 border border-gray-500 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-black-600 dark:placeholder-grey-400 dark:black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={firstName}
                  placeholder="First Name"
                  onChange={handleFirstNameChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:black"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="bg-grey-100 border border-gray-500 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-black-600 dark:placeholder-grey-400 dark:black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleLastNameChange}
                  value={lastName}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:black"
              >
                Phone number
              </label>
              <input
                type="number"
                id="phone_number"
                className="bg-grey-100 border border-gray-500 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-black-600 dark:placeholder-grey-400 dark:black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="+91-123-456-789"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
              />
            </div>

            {/* age */}
            <div className="mb-6">
              <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900 dark:black"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                className="bg-grey-100 border border-gray-500 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-black-600 dark:placeholder-grey-400 dark:black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={age}
                onChange={handleAgeChange}
                placeholder="18+"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:black"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="bg-grey-100 border border-gray-300 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-black-600 dark:placeholder-grey-400 dark:black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleEmailChange}
                value={email}
                placeholder="exapmle@gmail.com"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-grey-100 border border-gray-500 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-black-600 dark:placeholder-grey-400 dark:black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={password}
                onChange={handlePasswordChange}
                placeholder="•••••••••"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:black"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirm_password"
                className="bg-grey-100 border border-gray-500 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-black-600 dark:placeholder-grey-400 dark:black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                placeholder="•••••••••"
                required
              />
            </div>
            <button
              type="submit"
              onClick={(e) => addCustomer(e)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
