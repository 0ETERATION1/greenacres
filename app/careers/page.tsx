"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { handlePhoneChange } from "@/app/utils/phoneFormatting";
import {
  sanitizeInput,
  handleEmailChange,
  handleDetailsChange,
  getCharacterCountText,
  MAX_DETAILS_LENGTH,
} from "@/app/utils/sanitize";

export default function CareersPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [driversLicense, setDriversLicense] = useState("");
  const [ownTransportation, setOwnTransportation] = useState("");
  const [languages, setLanguages] = useState("");
  const [startDate, setStartDate] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", sanitizeInput(name));
      formData.append("email", email.toLowerCase().trim());
      formData.append("phone", phone.replace(/\D/g, ""));
      formData.append("experience", experience);
      formData.append("driversLicense", driversLicense);
      formData.append("ownTransportation", ownTransportation);
      formData.append("languages", languages);
      formData.append("startDate", startDate);
      formData.append("message", sanitizeInput(message));
      formData.append("website", website); // honeypot

      const response = await fetch("/api/submit-application", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      router.push("/submission-success");
    } catch (error) {
      console.error("Application submission error:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="pt-24 pb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-[#0cabba]">Careers</h1>
            <p className="text-xl leading-relaxed text-gray-700">
              We are always looking for dependable team members who care about
              quality service and take pride in their work.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-6 pb-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-8 sm:p-10 text-gray-700 space-y-3">
            <h2 className="text-2xl font-bold text-[#0cabba]">Join Our Team</h2>
            <p>
              Green Acres has served Montgomery County for over 30 years, and we
              are proud to remain a family-owned company.
            </p>
            <p>
              Fill out the application below and we will reach out about current
              and upcoming opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-[#0cabba]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="text-gray-700 mb-2">
                Please provide at least one way for us to contact you:
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Email {!phone && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e, setEmail)}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                  placeholder="Enter your email address"
                  required={!phone}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Phone Number{" "}
                  {!email && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e, setPhone)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                  placeholder="(123) 456-7890"
                  maxLength={14}
                  required={!email}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Years of Relevant Experience{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba] bg-white"
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="0-1 years">0–1 years</option>
                  <option value="1-3 years">1–3 years</option>
                  <option value="3-5 years">3–5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Valid Driver&apos;s License?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="driversLicense"
                      value="Yes"
                      checked={driversLicense === "Yes"}
                      onChange={(e) => setDriversLicense(e.target.value)}
                      className="accent-[#0cabba]"
                      required
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="driversLicense"
                      value="No"
                      checked={driversLicense === "No"}
                      onChange={(e) => setDriversLicense(e.target.value)}
                      className="accent-[#0cabba]"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Have Own Transportation?
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ownTransportation"
                      value="Yes"
                      checked={ownTransportation === "Yes"}
                      onChange={(e) => setOwnTransportation(e.target.value)}
                      className="accent-[#0cabba]"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="ownTransportation"
                      value="No"
                      checked={ownTransportation === "No"}
                      onChange={(e) => setOwnTransportation(e.target.value)}
                      className="accent-[#0cabba]"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Languages Spoken
                </label>
                <select
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba] bg-white"
                >
                  <option value="">Select languages</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Both">English &amp; Spanish</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Earliest Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Tell Us About Yourself (optional)
                  <span className="text-sm text-gray-500 ml-1">
                    {getCharacterCountText(message.length)}
                  </span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => handleDetailsChange(e, setMessage)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                  rows={4}
                  placeholder="Briefly share your background, skills, and why you'd like to join Green Acres..."
                  maxLength={MAX_DETAILS_LENGTH}
                />
              </div>

              {/* Honeypot — hidden from real users; bots fill it and get rejected. */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-10000px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label>
                  Website (leave blank)
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#0cabba] text-white py-3 px-6 rounded-lg transition-colors
                  ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#0b9aa7]"
                  }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Prefer email? Reach us at{" "}
                <a
                  href="mailto:info@greenacresdmv.com"
                  className="text-[#0cabba] underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  info@greenacresdmv.com
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
