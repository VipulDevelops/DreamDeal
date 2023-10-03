import React from 'react'
import { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
const UpdateProfile = () => {


    const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [age,setAge]=useState('');
  const [phoneNumber,setPhoneNumber]=useState('');

  const navigate= useNavigate();

  const updateCustomer = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("token");
      const decodedToken = jwt_decode(userId);
      const customerId = decodedToken.userId;


    // Validation
    if (firstName.trim() === '' || lastName.trim() === '') {
      alert("First Name and Last Name cannot be blank.");
      return;
    }

	if(!firstName.match(/^[a-zA-Z]+$/)){
		alert("no numbers allowed in first name")
		return;
	}

	if(!lastName.match(/^[a-zA-Z]+$/)){
		alert("no numbers allowed in last name")
		return;
	}

    if (!email.match(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z]{2,}$/)) {
      alert("Invalid email format. Please enter a valid email address");
      return;
    }

	

    const customer = {
      firstName,
      lastName,
      age,
      email,
      phoneNumber
    }

    // Additional checks for age and phone number

    if (customer.age < 18) {
      alert("You are not eligible to buy this item, please enter a valid age");
      return;
    }

    if (customer.phoneNumber.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    axios.put(`http://localhost:8080/customer/update/${customerId}`,customer)
      .then(response => {
        alert("updated successfully");
        navigate('/dashBoard');
      })
      .catch(error => {
        alert("Error: " + error.message);
        console.log("error",error.response);
      });
  }

  // Handle input changes
  const handleFirstNameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  return (
    <div><div className="font-mono bg-gray-400">
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">Update Account!</h3>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    value={firstName}
                    placeholder="First Name"
                    onChange={handleFirstNameChange}
                  />
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={handleLastNameChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={handleEmailChange}
                />
              </div>
              {/* Age and Phone no */}
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                    Age
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="age"
                    type="number"
                    value={age}
                    placeholder="e.g. 10"
                    onChange={handleAgeChange}
                  />
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                    Phone Number
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="phone_number"
                    type="tel"
                    pattern="[0-9]{10}"
                    value={phoneNumber}
                    placeholder="1234567890"
                    onChange={handlePhoneNumberChange}
                  />
                </div>
              </div>

              
              
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={updateCustomer}
                >
                  Update Profile
                </button>
              </div>
              <hr className="mb-6 border-t" />
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div></div>
  )
}

export default UpdateProfile