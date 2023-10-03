//.sendForm('service_dbecajy', 'template_e9z1dyb', form, 'cIiLm6gs1gwJDGTjZ')
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

// npm i @emailjs/browser

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dbecajy",
        "template_e9z1dyb",
        form.current,
        "cIiLm6gs1gwJDGTjZ"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <StyledContactForm>
        
      <form ref={form} onSubmit={sendEmail}>
        <p>Contact Us</p>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  form {
    width: 400px;
    display: flex;
    flex-direction: column;
    font-size: 16px;

    input,
    textarea {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-height: 100px;
      min-height: 100px;
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: blue;
      color: white;
      border: none;
    }

    p{
        font-size: 4rem;
        color: #231514;
        margin: auto;
        font-style: bold;
    }
  }
`;