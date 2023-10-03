import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';


const Cart = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [name, setName] = useState("");
    const navigate= useNavigate();  
    useEffect(() => {
    const userId = localStorage.getItem("token");
    const decodedToken = jwt_decode(userId);
    const customerId = decodedToken.userId;
   
      axios
      //TODO user id
        .get(`http://localhost:8080/cart/cartDetails/${customerId}`)
        .then((response) => {
          setProducts(response.data.items.map((item) => item.product));
          setCart(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const handleRemoveProduct = (productId) => {
      const userId = localStorage.getItem("token");
      const decodedToken = jwt_decode(userId);
      const customerId = decodedToken.userId;

      axios
         .put(`http://localhost:8080/cart/removeItem/${customerId}/${productId}`)
        
        .then((response) => {
          setProducts(response.data.items.map((item) => item.product));
          setCart(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          alert("error ocurred in remove product")
          console.log(error);
        });
    };
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
  
        script.onload = () => {
          resolve(true);
        };
  
        script.onerror = () => {
          resolve(false);
        };
  
        document.body.appendChild(script);
      });
    };
  
    // Function to display the Razorpay payment form
    const displayRazorPay = async (amount) => {
     
      try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
          alert("Failed to load Razorpay script. Please check your internet connection.");
          return;
        }
  
      const options = {
        key: "rzp_test_hRHaEIhkpd6odG",
        currency: "INR",
        amount: amount * 100,
        name: "Dream Deal",
        description: "Congratulations",
        handler: function (response) {
          alert("Payment successful");
          // Redirect or navigate to a success page
          navigate("/address");
        },
        prefill: {
          name: "Dream Deal",
        },
      };
  
      const paymentObject = new window.Razorpay(options);
    paymentObject.open();}
      catch (error) {
        console.error("An error occurred while displaying Razorpay:", error);
        alert("An error occurred while displaying Razorpay. Please try again.");
      }
    };
  
    return (
      <>
        <div class="h-screen bg-gray-100 pt-20">
          <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div class="rounded-lg md:w-2/3">
              {products.map((product) => (
                <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={`http://localhost:8080/product/getimage/${product.id}`}
                    alt="product-image"
                    class="w-full rounded-lg sm:w-40"
                  />
                  <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div class="mt-5 sm:mt-0">
                      <h2 class="text-lg font-bold text-gray-900">
                        {product.name}
                      </h2>
                      <p class="mt-1 text-xs text-gray-700">{product.description}</p>
                    </div>
                    <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    
                      <div class="flex items-center space-x-4">
                      
                        <p class="text-sm"><b><u>{product.price} INR</u></b> </p>
                        <button
            class="middle none center rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-950 transition-all hover:shadow-lg hover:shadow-black focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true" onClick ={()=>handleRemoveProduct(product.id)}
            
        >
            Remove
        </button>
                        
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  
                </div>
                
              ))}
            </div>
  
            <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div class="mb-2 flex justify-between">
                <p class="text-gray-700">Subtotal</p>
                <p class="text-gray-700">{cart.totalCartPrice}</p>
              </div>
              <div class="flex justify-between">
                <p class="text-gray-700">Shipping</p>
                <p class="text-gray-700"> 100 INR</p>
              </div>
              <hr class="my-4" />
              <div class="flex justify-between">
                <p class="text-lg font-bold">Total</p>
                <div class="">
                  <p class="mb-1 text-lg font-bold">
                    {cart.totalCartPrice + 100 } INR
                  </p>
                  <p class="text-sm text-gray-700">including GST</p>
                </div>
              </div>
              <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"  onClick={()=>displayRazorPay(cart.totalCartPrice + 100 )}>
                Check out
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Cart;