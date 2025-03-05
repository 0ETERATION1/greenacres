"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null as string | null },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    try {
      // Validate input data before submission
      if (!validateFormData(formData)) {
        throw new Error("Invalid form data. Please check your inputs.");
      }

      // Create FormData object for submission with sanitized data
      const submitData = new FormData();
      submitData.append("collection", "fromContactForm");
      submitData.append(
        "name",
        `${sanitizeInput(formData.firstName)} ${sanitizeInput(
          formData.lastName
        )}`
      );
      submitData.append("email", sanitizeInput(formData.email));
      submitData.append("phone", sanitizeInput(formData.phone));
      submitData.append("service", sanitizeInput(formData.subject));
      submitData.append("details", sanitizeInput(formData.message));
      submitData.append("status", "new");

      console.log(
        "Submitting form data:",
        Object.fromEntries(submitData.entries())
      );

      const res = await fetch("/api/submit-form", {
        method: "POST",
        body: submitData,
      });

      // Log the raw response for debugging
      console.log("Response status:", res.status);
      const responseText = await res.text();
      console.log("Response text:", responseText);

      // Parse the JSON response if possible
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response as JSON:", e);
        throw new Error("Invalid server response format");
      }

      if (res.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: "Message sent successfully!" },
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: {
            error: true,
            msg: data.error || "Something went wrong. Please try again.",
          },
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        submitted: false,
        submitting: false,
        info: {
          error: true,
          msg:
            error instanceof Error
              ? error.message
              : "An error occurred. Please try again later.",
        },
      });
    }
  };

  // Helper function to sanitize input
  const sanitizeInput = (input: string): string => {
    // Basic sanitization to prevent XSS
    return input
      .trim()
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };

  // Validate form data
  const validateFormData = (data: typeof formData): boolean => {
    // Check for empty required fields
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.phone ||
      !data.subject ||
      !data.message
    ) {
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return false;
    }

    // Phone validation (basic format check)
    const phoneRegex = /^[0-9()\-\s+]{7,20}$/;
    if (!phoneRegex.test(data.phone)) {
      return false;
    }

    // Length validation
    if (
      data.firstName.length > 50 ||
      data.lastName.length > 50 ||
      data.email.length > 100 ||
      data.phone.length > 20 ||
      data.subject.length > 100 ||
      data.message.length > 5000
    ) {
      return false;
    }

    return true;
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-600">
                  14144 Travilah Road
                  <br />
                  Rockville, Maryland 20850
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <a
                  href="tel:+13012781049"
                  className="text-gray-600 hover:text-green-600 transition"
                >
                  (301) 278-1049
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Email</h3>
                <a
                  href="mailto:info@greenacresdmv.com"
                  className="text-gray-600 hover:text-green-600 transition"
                >
                  info@greenacresdmv.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 9:00 PM
                  <br />
                  Saturday & Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-2">About Us</h3>
            <p className="text-gray-600">
              Green Acres is a landscaping company based in Montgomery County,
              Maryland. Founded over 30 years ago, we strive to continue
              providing quality service for our clients.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

          {status.submitted ? (
            <div className="text-center p-6">
              <div className="text-green-600 text-xl mb-4">
                Thank you for your message!
              </div>
              <p className="text-gray-600">
                We'll get back to you as soon as possible.
              </p>
              <button
                onClick={() =>
                  setStatus({
                    submitted: false,
                    submitting: false,
                    info: { error: false, msg: null },
                  })
                }
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-md shadow-sm hover:from-green-700 hover:to-green-800 transition-colors disabled:opacity-70"
                >
                  {status.submitting ? "Sending..." : "Send Message"}
                </button>
              </div>

              {status.info.error && (
                <div className="text-red-500 text-center">
                  {status.info.msg}
                </div>
              )}
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Need a quote for your project?{" "}
              <Link
                href="/quotePage"
                className="text-green-600 font-medium hover:underline"
              >
                Get a free quote here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Find Us</h2>
        <div className="h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3096.8508662333366!2d-77.2935!3d39.0815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b62d7c0e1a1a1d%3A0x1b0d1b0e1b0d1b0e!2s14144%20Travilah%20Rd%2C%20Rockville%2C%20MD%2020850!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
