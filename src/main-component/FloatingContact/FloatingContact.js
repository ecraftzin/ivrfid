import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import "./FloatingContact.css";

const FloatingContact = () => {
  return (
    <div className="floating-contact">
      {/* WhatsApp */}
      <a
        href="https://wa.me/971582852600"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp"
        aria-label="WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Call */}
      <a
        href="tel:+971582852600"
        className="call"
        aria-label="Call"
      >
        <FaPhoneAlt />
      </a>
    </div>
  );
};

export default FloatingContact;
