import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { useEffect } from 'react';

const GetAllCustomers = () => {

    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      axios
        .get(`http://localhost:8080/customer`)
        .then((response) => {
          setCustomers(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    return (
      <>
      <h1 class="mb-10 text-center text-2xl font-bold">Customer Details</h1>
<div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
  <div class="rounded-lg md:w-2/3">
    {customers.map((customer) => (
      <div class="justify-between mb-6 rounded-lg bg-blue-500 p-6 shadow-md sm:flex sm:justify-start">
      <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div class="mt-5 sm:mt-0">
          <h2 class="text-lg font-bold text-white">
            {customer.firstName} {customer.lastName}
          </h2>
          <p class="mt-1 text-xs text-white">{customer.email}</p>
        </div>
      </div>
    </div>
    ))}
  </div>
</div>
      </>
    );
  };

export default GetAllCustomers