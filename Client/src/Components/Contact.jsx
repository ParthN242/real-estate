import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing, setContact }) => {
  const [message, setMessage] = useState("");

  return (
    <>
      {listing && (
        <div className="flex flex-col gap-2">
          <p>
            Contact{" "}
            <span className="font-semibold">{listing.userRef.name}</span> for{" "}
            <span className="font-semibold">{listing.title}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <button
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
            onClick={() => setContact(false)}
          >
            Send Message
          </button>
        </div>
      )}
    </>
  );
};

export default Contact;
