import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Address = () => {
const[address,setAddress]=useState('');
const[street,setStreet]=useState('');
const[city,setCity]=useState('');
const[pinCode,setPinCode]=useState('');
 const[customer,setCustomer]=useState('');
 const navigate = useNavigate();
const handleSubmit=(e)=>{
    const addresses={
        address,
        street,
        city,
        pinCode
		//  customer
    }
	const userId = localStorage.getItem("token");
      const decodedToken = jwt_decode(userId);
      const customerId = decodedToken.userId;

	//   axios.get(`http://localhost:8080/customer/${customerId}`).then((response)=>{
	// 	setCustomer(response.data);
	// 	alert("in get customer");
	//   }).catch((error)=>{
	// 	alert("error in fetching customer");
	//   }).then(
	
    axios.post(`http://localhost:8080/address/${customerId}`,addresses)
    .then((response)=>{
        alert("Address added")
        console.log("added to address table");
		navigate("/products");
	
    }).catch((error)=>{
		alert(JSON.stringify(addresses))
        alert("error ocuured");
        console.log("error ocuured");
    })
	//   )

    
}


    return (
    <div className="font-mono bg-white-400" >
		{/* <!-- Container --> */}
		<div className="container mx-auto">
			<div className="flex justify-center px-6 my-12">
				{/* <!-- Row --> */}
				<div className="w-full xl:w-3/4 lg:w-11/12 flex">
					{/* <!-- Col --> */}
					<div
						className="w-full h-auto bg-white-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
						//style="background-image: url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')"
					></div>
					{/* <!-- Col --> */}
					<div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
						<h3 className="pt-4 text-2xl text-center">Post to the Address!</h3>
						<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
							<div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="Address">
										Address
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										id="address"
										type="text"
                                        value={address}
                                        onChange={(p)=>setAddress(p.target.value)}
									/>
								</div>
								<div className="md:ml-2">
									<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="street">
										Street
									</label>
									<input
										className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										id="street"
										type="text"
                                        value={street}
                                        onChange={(p)=>setStreet(p.target.value)}
									/>
								</div>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="city">
									City
								</label>
								<input
									className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="city"
									type="text"
                                    value={city}
                                    onChange={(p)=>setCity(p.target.value)}
								/>
							</div>
                        <div className="mb-4 md:flex md:justify-between">
								<div className="mb-4 md:mr-2 md:mb-0">
									<label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="pinCode">
										Pincode
									</label>
									<input
										className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										id="pinCode"
										type="text"
                                        value={pinCode}
                                        onChange={(p)=>setPinCode(p.target.value)}
									/>
									
								</div>
								
							</div>

							
							<div className="mb-6 text-center">
								<button
									className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="submit" 
                                    onClick={(e) => handleSubmit(e)}
								>
									Post to Address
								</button>
							</div>
							
							
						</form>
					</div>
				</div>
			</div>
		</div>
		
	</div>
  )
}

export default Address
