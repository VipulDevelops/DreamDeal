import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "tailwindcss/tailwind.css";

function ProductList1() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [id, setId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Token is not available, handle the exception here
      // Redirect to login or show an error message
      return;
    }

    axios
      .get("http://localhost:8080/product")

      .then((response) => {
        setProducts(response.data);
        setImages(response.data.map((product) => product.img));

        console.log(response.data);
        // alert(response.data.name)
      })
      .catch((error) => {
        alert("Fetching of products failed");
        console.log(error);
      });
  }, []);

  const handleSortByPrice = (event) => {
    const sortValue = event.target.value;
    setSortByPrice(sortValue);

    let sortedProducts = [...products];

    if (sortValue === "Minimum to Maximum price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "Maximum to Minimum price") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  const handleProductClick = (productId) => {
    // Redirect to another page with the product ID as a parameter
    navigate(`/selectedProduct/${productId}`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-blue-200  ">
          <b>Sort By price :&nbsp;&nbsp;&nbsp;</b>
          <select onChange={handleSortByPrice} value={sortByPrice}>
            <option></option>
            <option>Minimum to Maximum price</option>
            <option>Maximum to Minimum price</option>
          </select>
        </div>

        <div className="flex flex-wrap">
          {products.map((product) => (
            <div className="w-1/3 p-4">
              <a
                href={product.id}
                className="group"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={`http://localhost:8080/product/getimage/${product.id}`}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    style={{ width: "100%", height: "500px" }}
                  ></img>
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  <h1>Price-</h1>
                  {product.price}
                </p>
                <p>
                  <h1>{product.description}</h1>
                </p>
              </a>
              <h1>{product.id}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList1;
