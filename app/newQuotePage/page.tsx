"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function QuotePage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [yardDetails, setYardDetails] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const MAX_CHUNK_SIZE = 2 * 1024 * 1024; // 2MB chunks

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderSizeOptions = () => {
    if (selectedService !== "mowing") return null;

    interface SizeOption {
      name: string;
      image?: string;
      isText?: boolean;
    }

    const sizeOptions: SizeOption[] = [
      { name: "Small", image: "/assets/images/yards/smallYard.jpg" },
      { name: "Medium", image: "/assets/images/yards/mediumYard.jpg" },
      { name: "Large", image: "/assets/images/yards/largeYard.jpg" },
      { name: "Other", isText: true },
    ];

    return (
      <div className="max-w-4xl mx-auto mt-12 mb-32 px-4">
        <h2 className="text-2xl text-center font-semibold mb-6 text-[#0cabba]">
          Select Your Yard Size
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {sizeOptions.map((size) => (
            <div
              key={size.name}
              onClick={() => setSelectedSize(size.name.toLowerCase())}
              className={`
                border rounded-lg cursor-pointer transition-all
                hover:shadow-lg flex flex-col relative overflow-hidden
                min-h-[300px]
                ${
                  selectedSize === size.name.toLowerCase()
                    ? "border-[#0cabba] border-2 shadow-xl scale-[1.02]"
                    : "border-gray-200"
                }
              `}
            >
              <div
                className={`relative z-10 bg-white p-4 rounded-t-lg border-b
                ${
                  selectedSize === size.name.toLowerCase()
                    ? "border-[#0cabba]"
                    : ""
                }`}
              >
                <h3
                  className={`text-xl font-semibold text-center
                  ${
                    selectedSize === size.name.toLowerCase() ? "font-bold" : ""
                  }`}
                >
                  {size.name}
                </h3>
              </div>
              {size.isText ? (
                <div className="flex items-center justify-center h-full p-8 text-center text-gray-800 text-lg">
                  My Yard Does not Match the Current Options
                </div>
              ) : (
                <div className="absolute inset-0 top-[56px] z-0">
                  <Image
                    src={size.image!}
                    alt={`${size.name} Yard`}
                    fill
                    quality={100}
                    priority
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderOtherYardForm = () => {
    if (selectedService !== "mowing" || selectedSize !== "other") return null;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!name) {
        alert("Please enter your name");
        return;
      }

      if (!email && !phone) {
        alert("Please enter either an email or phone number");
        return;
      }

      if (videoFile && videoFile.size > 200 * 1024 * 1024) {
        alert("Video file size must be less than 200MB");
        return;
      }

      try {
        setIsSubmitting(true);

        // Handle regular form data first
        const formData = new FormData();
        formData.append("name", name);
        if (email) formData.append("email", email);
        if (phone) formData.append("phone", phone);
        formData.append("service", selectedService || "");
        formData.append("size", selectedSize || "");
        formData.append("details", yardDetails);

        // If there's a video, handle it in chunks
        if (videoFile) {
          try {
            const totalChunks = Math.ceil(videoFile.size / MAX_CHUNK_SIZE);

            for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
              const start = chunkIndex * MAX_CHUNK_SIZE;
              const end = Math.min(start + MAX_CHUNK_SIZE, videoFile.size);
              const chunk = videoFile.slice(start, end);

              const chunkFormData = new FormData();
              chunkFormData.append("chunk", chunk);
              chunkFormData.append("fileName", videoFile.name);
              chunkFormData.append("chunkIndex", chunkIndex.toString());
              chunkFormData.append("totalChunks", totalChunks.toString());

              console.log(`Uploading chunk ${chunkIndex + 1}/${totalChunks}`);
              const chunkResponse = await fetch("/api/upload-chunk", {
                method: "POST",
                body: chunkFormData,
              });

              if (!chunkResponse.ok) {
                const errorData = await chunkResponse.json();
                throw new Error(
                  `Failed to upload chunk ${chunkIndex}: ${
                    errorData.details || chunkResponse.statusText
                  }`
                );
              }

              const responseData = await chunkResponse.json();
              console.log(
                `Chunk ${chunkIndex + 1} upload response:`,
                responseData
              );
            }
          } catch (error) {
            console.error("Video upload error:", error);
            throw new Error(
              `Video upload failed: ${
                error instanceof Error ? error.message : "Unknown error"
              }`
            );
          }
        }

        // Submit the rest of the form data
        const response = await fetch("/api/submit-form", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        alert("Thank you! Your submission has been received.");
        setYardDetails("");
        setVideoFile(null);
        setName("");
        setEmail("");
        setPhone("");
      } catch (error) {
        console.error("Form submission error:", error);
        alert(error instanceof Error ? error.message : "Failed to submit form");
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > 200 * 1024 * 1024) {
          alert("Video file size must be less than 200MB");
          e.target.value = "";
          return;
        }
        setVideoFile(file);
      }
    };

    return (
      <>
        <div className="max-w-4xl mx-auto -mt-24 mb-6 px-4">
          <h2 className="text-2xl text-center font-semibold text-[#0cabba]">
            Tell Us About Your Yard
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mb-32 px-4">
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-[#0cabba]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="text-gray-700 mb-2">
                Please provide at least one way for us to contact you:
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Enter your email{" "}
                  {!phone && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                  placeholder="Enter your email address"
                  required={!phone}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Enter your phone number{" "}
                  {!email && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                  placeholder="Enter your phone number"
                  required={!email}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Describe your yard details:
                </label>
                <textarea
                  value={yardDetails}
                  onChange={(e) => setYardDetails(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                  rows={4}
                  placeholder="Please tell us about your yard..."
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Or upload a video of your lawn:
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                />
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
                {isSubmitting ? "Submitting..." : "Submit Details"}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-center mb-8 text-[#0cabba]">
              Get a Quote
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto text-gray-700">
              Choose your service below and let us help you transform your
              outdoor space into something extraordinary.
            </p>
          </div>
        </section>

        {/* Service Selection Section */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl text-center font-semibold mb-4 bg-green-600 text-white shadow-lg p-4 rounded-t-lg">
                Select your Service
              </h2>
              {/* <p className="text-lg text-white bg-[#557A46] p-4 -mt-4">
              select service(s) below
            </p> */}

              {/* Service Selection Boxes */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Mowing Service Box */}
                <div
                  className={`                  border rounded-lg cursor-pointer transition-all
                  hover:shadow-lg flex flex-col relative overflow-hidden
                  min-h-[400px] text-[#0cabba]
                  ${
                    selectedService === "mowing"
                      ? "border-[#0cabba] border-2 shadow-xl scale-[1.02]"
                      : "border-gray-200"
                  }
                `}
                  onClick={() => setSelectedService("mowing")}
                >
                  <div
                    className={`relative z-10 bg-white p-4 rounded-t-lg border-b
                    ${selectedService === "mowing" ? "border-[#0cabba]" : ""}`}
                  >
                    <h3
                      className={`text-xl font-semibold text-center
                      ${selectedService === "mowing" ? "font-bold" : ""}`}
                    >
                      Mowing Service (Instant Price)
                    </h3>
                  </div>
                  <div className="absolute inset-0 top-[56px] z-0">
                    <Image
                      src="/assets/images/port/LawnMaintenance /Nick mowing a larger property we maintain_.jpg"
                      alt="Mowing Service"
                      fill
                      quality={100}
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Landscaping Service Box */}
                <div
                  className={`                  border rounded-lg cursor-pointer transition-all
                  hover:shadow-lg flex flex-col relative overflow-hidden
                  min-h-[400px] text-[#0cabba]
                  ${
                    selectedService === "landscaping"
                      ? "border-[#0cabba] border-2 shadow-xl scale-[1.02]"
                      : "border-gray-200"
                  }
                `}
                  onClick={() => setSelectedService("landscaping")}
                >
                  <div
                    className={`relative z-10 bg-white p-4 rounded-t-lg border-b
                    ${
                      selectedService === "landscaping"
                        ? "border-[#0cabba]"
                        : ""
                    }`}
                  >
                    <h3
                      className={`text-xl font-semibold text-center
                      ${selectedService === "landscaping" ? "font-bold" : ""}`}
                    >
                      Landscaping / Property Cleanup / Other
                    </h3>
                  </div>
                  <div className="absolute inset-0 top-[56px] z-0">
                    <Image
                      src="/assets/images/port/plantInstall3.jpg"
                      alt="Landscaping Service"
                      fill
                      quality={100}
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Size Selection Menu */}
            {renderSizeOptions()}

            {/* Other Yard Form */}
            {renderOtherYardForm()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
