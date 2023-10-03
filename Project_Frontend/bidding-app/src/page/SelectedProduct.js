import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

function SelectedProduct() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${productId}`)

      .then((response) => {
        setProduct(response.data);
        // const productImages = response.data.map(product => product.img);
        // setImage(productImages);
        setImage(response.data.img);
        console.log(response.data);
        // alert(response.data.name)
      })
      .catch((error) => {
        alert("Got error");
        console.log(error);
      });
  }, [productId]);

  const handleProductClick = (productId) => {
    const userId = localStorage.getItem("token");
    const decodedToken = jwt_decode(userId);
    const customerId = decodedToken.userId;

    axios
      .post(`http://localhost:8080/cart/addProduct/${productId}/${customerId}`)
      .then((response) => {
        alert("Added to cart");
      })
      .catch((error) => {
        console.log(error);
      });

    navigate(`/products`);
  };

  if (!product) {
    // Render a loading state or return null while fetching the data
    return <div>Loading...</div>;
  }

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                onClick={handleProductClick}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                  <img
                    src={`http://localhost:8080/product/getimage/${productId}`}
                    alt="Two each of gray, white, and black shirts arranged on table."
                    className="object-cover object-center"
                  />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                    {product.name}
                  </h2>

                  <section
                    aria-labelledby="information-heading"
                    className="mt-2"
                  >
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="text-2xl text-gray-900">
                      {product.price} INR
                    </p>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-10">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <form>
                      <div>
                        <p>{product.description}</p>
                      </div>

                      {/* <!-- Sizes --> */}

                      <button
                        type="submit"
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={() => handleProductClick(productId)}
                      >
                        Add to bag
                      </button>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedProduct;
