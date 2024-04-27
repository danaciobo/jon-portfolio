import React from "react";
import { useState } from "react";
import { sendEmailData } from "../services";

const ContactForm = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [message, setMessage] = useState({ text: "", type: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }


    try {

      const response = await sendEmailData(form);

      setMessage({ text: "Email sent succesfully!", type: "success" })
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage({ text: error.message, type: "error" })
    }
  };


  return (
    <div className="contact-container">
      <div className="contact-info-container">
        <h3>Some info here</h3>

      </div>
      <div>
        <form className="email-form" onSubmit={handleSubmit}>

          <div className="name">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="email">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="message">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} />
          </div>

          <button className="send-button" type="submit">Send</button>

        </form>
        {message.text && (<div className={message.type === "success" ? "success-message" : "error-message"}>{message.text}</div>)}
      </div>
    </div>
  )
}
export default ContactForm;