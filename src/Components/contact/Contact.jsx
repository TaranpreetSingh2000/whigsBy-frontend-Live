import React, { useState } from "react";

const Contact = () => {

  const [name, setName]= useState("")
  const [email, setEmail]= useState("")
  const [subject, setSubject]= useState("")
  const [message, setMessage]= useState("")

  
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-lg">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? If you have any inquiries about the site or our
          products, please feel free to send us on email. Let us know.
        </p>
        <form  class="space-y-8" action="https://api.web3forms.com/submit" method="POST">
        <input type="hidden" name="access_key" value="a29fffd1-ae53-4a8f-8ef3-15f42c727384"/>
 
        <div>
            <label
              for="text"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
            Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}

              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <label
              for="subject"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e)=> setSubject(e.target.value)}

              class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div class="sm:col-span-2">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              name="message"
              value={message}
              onChange={(e)=> setMessage(e.target.value)}

              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            class="py-3 px-4 text-md font-medium text-center rounded-lg text-white bg-blue-700 focus:ring-4 focus:outline-none hover:bg-blue-600 hover:transition all duration-500 ease-in-out"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
