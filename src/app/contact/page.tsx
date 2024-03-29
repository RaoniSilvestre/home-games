// src/app/contact/page.tsx
"use client";

import React, { useState } from 'react';
const Contact = () => {
  // State for form fields and notifications
  const [formState, setFormState] = useState({ name: "", email: "", description: "" });
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetching API endpoint
    let res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formState),
    });
    let data = await res.json();
    // Displaying success/failure message
    setMessage(data.message);
    setActive(true);
    setTimeout(() => {
      setActive(false);
      setMessage("");
    }, 3000);
  };
  // Handling input changes
  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className='relative'>
      {/* Notification for successful form submission */}
      <div
        style={{
          right: active && message ? 24 : "-50%",
        }}
        className='fixed bottom-5 duration-200 px-4 py-2 font-semibold rounded bg-sky-200 text-black'>
        <p>Sent successfully</p>
      </div>
      <h1 className='text-4xl mb-8 font-bold'>How can we help today?</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className='flex flex-col mb-3'>
          <label htmlFor="name">Name</label>
          <input
            placeholder='Your Name'
            onChange={handleChange}
            id='name'
            type="text"
            required
            className='border rounded py-2 px-2 mt-1 outline-none focus:border-sky-800'
          />
        </div>
        <div className='flex flex-col mb-3'>
          <label htmlFor='email'>Email</label>
          <input
            placeholder='example@gmail.com'
            onChange={handleChange}
            id="email"
            type="email"
            required
            className='border rounded py-2 px-2 mt-1 outline-none focus:border-sky-800'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='description'>Description</label>
          <textarea
            placeholder='Comments'
            onChange={handleChange}
            id="description"
            required
            rows={6}
            className='border resize-none rounded py-2 px-2 mt-1 outline-none focus:border-sky-800'
          />
        </div>
        {/* Submit button */}
        <button className='mt-6 w-full py-3 bg-sky-800 rounded text-white font-semibold uppercase'>
          Send
        </button>
      </form>
    </div>
  );
};
export default Contact;
