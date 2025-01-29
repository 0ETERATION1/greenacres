"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/firebase";

interface PricingInfo {
  weekly: number;
  biweekly: number;
  size: string;
  sqft: string;
}

const PRICING_DATA: Record<string, PricingInfo> = {
  small: {
    weekly: 45,
    biweekly: 65,
    size: "Small",
    sqft: "10,000 sq ft and under",
  },
  medium: {
    weekly: 70,
    biweekly: 105,
    size: "Medium",
    sqft: "10,001 to 27,000 sq ft",
  },
  large: {
    weekly: 95,
    biweekly: 142.5,
    size: "Large",
    sqft: "27,001 to 43,560 sq ft (1 acre)",
  },
};

const PricingDisplay = ({ size }: { size: string }) => {
  const pricing = PRICING_DATA[size];
  if (!pricing) return null;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border-2 border-[#0cabba]">
      <h3 className="text-2xl font-bold text-center text-[#0cabba] mb-6">
        {pricing.size} Lawn Pricing
        <span className="block text-sm font-normal text-gray-600 mt-1">
          ({pricing.sqft})
        </span>
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <h4 className="text-lg font-semibold text-[#0cabba] mb-2">
            Weekly Service
          </h4>
          <p className="text-3xl font-bold text-gray-800">${pricing.weekly}</p>
          <p className="text-gray-600 text-sm">per visit</p>
          <p className="mt-2 text-sm text-gray-600">
            Most popular choice for optimal lawn health
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
          <h4 className="text-lg font-semibold text-[#0cabba] mb-2">
            Biweekly Service
          </h4>
          <p className="text-3xl font-bold text-gray-800">
            ${pricing.biweekly}
          </p>
          <p className="text-gray-600 text-sm">per visit</p>
          <p className="mt-2 text-sm text-gray-600">
            Flexible option for moderate growth seasons
          </p>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Prices include basic lawn mowing service.</p>
        <p className="mt-1">Additional services available upon request.</p>
      </div>
    </div>
  );
};

const TermsAndService = ({
  setAcceptedTerms,
}: {
  setAcceptedTerms: (value: boolean) => void;
}) => {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold text-[#0cabba] mb-4">
        Seasonal Service Policy
      </h3>

      <div className="space-y-4 text-gray-700">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Peak Season Requirements</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Weekly service is required from March through May to maintain the
              health and appearance of your lawn during the peak growth season.
            </li>
            <li>
              If you wish to change the frequency of service after May, please
              contact us to discuss adjustments.
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">
            Initial Mowing and Overgrown Lawn Policy
          </h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The first mowing service will be billed at $1.50 per minute per
              person if the lawn is overgrown or in poor condition.
            </li>
            <li>
              This ensures fair compensation for the extra time and labor
              required to bring the property up to standard.
            </li>
            <li>
              After the first service, regular pricing will apply, but rates may
              be adjusted based on the scope of work needed to maintain the
              property.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center space-x-4">
        <button
          type="button"
          onClick={() => setAcceptedTerms(true)}
          className={`px-6 py-2 rounded-lg transition-colors ${
            true
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Accept Terms
        </button>
        <button
          type="button"
          onClick={() => setAcceptedTerms(false)}
          className={`px-6 py-2 rounded-lg transition-colors ${
            false
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Decline Terms
        </button>
      </div>
    </div>
  );
};

export default function QuotePage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [yardDetails, setYardDetails] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Reference to file input for resetting
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    const resetForm = () => {
      setYardDetails("");
      setVideoFile(null);
      setName("");
      setEmail("");
      setPhone("");
      setUploadProgress(0);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        setIsSubmitting(true);
        let videoUrl = "";

        if (videoFile) {
          const storageRef = ref(
            storage,
            `videos/${Date.now()}-${videoFile.name}`
          );
          const uploadTask = uploadBytesResumable(storageRef, videoFile);

          await new Promise<void>((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
              },
              reject,
              async () => {
                try {
                  videoUrl = await getDownloadURL(uploadTask.snapshot.ref);
                  resolve();
                } catch (error) {
                  reject(error);
                }
              }
            );
          });
        }

        console.log("Video URL before form submission:", videoUrl);

        const formData = new FormData();
        formData.append("name", name);
        if (email) formData.append("email", email);
        if (phone) formData.append("phone", phone);
        formData.append("service", selectedService || "");
        formData.append("size", selectedSize || "");
        formData.append("details", yardDetails);
        if (videoUrl) formData.append("videoUrl", videoUrl);

        console.log("Submitting form with data:", {
          name,
          email,
          phone,
          service: selectedService,
          size: selectedSize,
          hasVideo: !!videoFile,
        });

        const response = await fetch("/api/submit-form", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server response:", {
            status: response.status,
            statusText: response.statusText,
            body: errorText,
          });
          throw new Error(
            `Server error: ${response.status} - ${
              errorText || response.statusText
            }`
          );
        }

        alert("Thank you! Your submission has been received.");
        resetForm(); // Reset all form fields
      } catch (error) {
        console.error("Form submission error:", error);
        alert(error instanceof Error ? error.message : "Failed to submit form");
      } finally {
        setIsSubmitting(false);
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
                  Upload a video of your lawn:
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                />
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#0cabba] h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Uploading: {uploadProgress.toFixed(0)}%
                    </p>
                  </div>
                )}
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

  const renderPricing = () => {
    if (
      selectedService !== "mowing" ||
      !selectedSize ||
      selectedSize === "other"
    ) {
      return null;
    }

    return (
      <>
        <PricingDisplay size={selectedSize} />
        <TermsAndService setAcceptedTerms={setAcceptedTerms} />
        <div className="max-w-2xl mx-auto mt-8 mb-32">
          <button
            type="submit"
            disabled={!acceptedTerms || isSubmitting}
            className={`w-full py-4 rounded-lg text-lg font-semibold transition-colors ${
              !acceptedTerms || isSubmitting
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#0cabba] text-white hover:bg-[#0b9aa7]"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Quote Request"}
          </button>
          {!acceptedTerms && (
            <p className="text-red-500 text-center mt-2">
              Please accept the terms to proceed
            </p>
          )}
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

            {/* Pricing Display */}
            {renderPricing()}

            {/* Other Yard Form */}
            {renderOtherYardForm()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
