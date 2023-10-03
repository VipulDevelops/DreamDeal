import React from "react";
import "../index.css";

function TeamMember({ name, email }) {
  return (
    <div className="column">
      <div className="card bg-white shadow-lg p-4">
        <div className="container">
          <h2>{name}</h2>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </div>
    </div>
  );
}

function OurTeam() {
  return (
    <div>
      <h2
        style={{ textAlign: "center" }}
        className="text-4xl mt-4 mb-4 font-bold tracking-wider"
      >
        Our Team
      </h2>
      <div className="flex flex-wrap justify-center items-center text-xl font-medium">
        <TeamMember name="Harshad Lawar" email="harshad.lawar04@gmail.com" />
        <TeamMember name="Nikhil Chaudhari" email="nikhil@gmail.com" />
        <TeamMember name="Tushar Satalkar" email="tushar@gmail.com" />
        <TeamMember name="Varad Deshmukh" email="varad@gmail.com" />
        <TeamMember name="Vipul Sharma" email="vipul@gmail.com" />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-primary text-blue">
      <div className="about-section">
        <h1 className="text-black text-center text-4xl mt-10 mb-10 font-bold tracking-wider ">
          About Us
        </h1>
        <p className="text-black leading-8 text-xl">
          Dream Deal is a web-based application that allows users to buy a
          particular art product.Utilized Spring Boot and Java for backend
          development, ensuring seamless functionality .Integrated React.js to
          enhance user interaction and engagement.Managed the data securely
          through MySQL, maintaining data integrity .The application has a user
          management system, a system for managing artworks, a system for buying
          artworks.The application is designed to be user-friendly and secure.
        </p>
        <p className="text-black text-center text-4xl mt-6 mb-10 font-bold tracking-wider ">
          Our Future Plan
        </p>
        <p className="text-black text-xl text-center">
          Adding a bidding functionality to allow users to compete for artworks.
        </p>
      </div>
      <OurTeam />
    </div>
  );
}

export default App;
