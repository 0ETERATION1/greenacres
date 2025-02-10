"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/firebase";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { handlePhoneChange } from "@/app/utils/phoneFormatting";
import {
  sanitizeInput,
  handleDetailsChange,
  getCharacterCountText,
  MAX_DETAILS_LENGTH,
} from "@/app/utils/sanitize";
import { useRouter } from "next/navigation";

interface PricingInfo {
  weekly: number;
  biweekly: number;
  size: string;
  sqft: string;
}

const PRICING_DATA: Record<string, PricingInfo> = {
  small: {
    weekly: 45,
    biweekly: 60,
    size: "Small",
    sqft: "Please Select One and Read our Policy Below",
  },
  medium: {
    weekly: 65,
    biweekly: 80,
    size: "Medium",
    sqft: "Please Select One and Read our Policy Below",
  },
  large: {
    weekly: 85,
    biweekly: 100,
    size: "Large",
    sqft: "Please Select One and Read our Policy Below",
  },
};

const PricingDisplay = ({
  size,
  selectedFrequency,
  setSelectedFrequency,
  setClientSecret,
}: {
  size: string;
  selectedFrequency: "weekly" | "biweekly" | null;
  setSelectedFrequency: (frequency: "weekly" | "biweekly") => void;
  setClientSecret: (secret: string) => void;
}) => {
  const pricing = PRICING_DATA[size];
  if (!pricing) return null;

  const handleFrequencySelect = (frequency: "weekly" | "biweekly") => {
    if (frequency !== selectedFrequency) {
      setClientSecret(""); // Reset checkout
      setSelectedFrequency(frequency);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border-2 border-[#0cabba]">
      <h3 className="text-2xl font-bold text-center text-[#0cabba] mb-6">
        {pricing.size} Lawn Pricing
        <span className="block text-sm font-normal text-gray-600 mt-1">
          ({pricing.sqft})
        </span>
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div
          onClick={() => handleFrequencySelect("weekly")}
          className={`p-4 bg-gray-50 rounded-lg border cursor-pointer transition-all
          ${
            selectedFrequency === "weekly"
              ? "border-[#0cabba] shadow-md scale-105"
              : "border-gray-200 hover:border-[#0cabba] hover:shadow-md"
          }`}
        >
          <h4 className="text-lg font-semibold text-[#0cabba] mb-2">
            Weekly Service
          </h4>
          <p className="text-3xl font-bold text-gray-800">${pricing.weekly}</p>
          <p className="text-gray-600 text-sm">per visit</p>
          <p className="mt-2 text-sm text-gray-600">
            Most popular choice for optimal lawn health
          </p>
        </div>

        <div
          onClick={() => handleFrequencySelect("biweekly")}
          className={`p-4 bg-gray-50 rounded-lg border cursor-pointer transition-all
          ${
            selectedFrequency === "biweekly"
              ? "border-[#0cabba] shadow-md scale-105"
              : "border-gray-200 hover:border-[#0cabba] hover:shadow-md"
          }`}
        >
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
      <div className="mt-8 text-center px-4">
        <div className="bg-[#f8fafc] p-6 rounded-lg border border-[#0cabba]/20">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-semibold text-[#0cabba]">
              Accept the quote and submit payment today to lock in your rate!
            </span>
            <br />
            <span className="text-gray-600">
              Once payment has been received, Green Acres Landscaping will
              contact you within
              <span className="text-medium font-semibold text-black">
                {" "}
                24 hours{" "}
              </span>
              to schedule your first service—
              <span className="text-medium font-semibold text-black">
                guaranteed
              </span>
              , or your money back.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Initialize Stripe outside component
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const DeclinedForm = ({
  declinedName,
  setDeclinedName,
  declinedEmail,
  setDeclinedEmail,
  declinedPhone,
  setDeclinedPhone,
  declinedDetails,
  setDeclinedDetails,
  declinedVideoFile,
  setDeclinedVideoFile,
  declinedUploadProgress,
  setDeclinedUploadProgress,
  declinedFileInputRef,
  isSubmitting,
  setIsSubmitting,
  selectedService,
  selectedSize,
}: {
  declinedName: string;
  setDeclinedName: (name: string) => void;
  declinedEmail: string;
  setDeclinedEmail: (email: string) => void;
  declinedPhone: string;
  setDeclinedPhone: (phone: string) => void;
  declinedDetails: string;
  setDeclinedDetails: (details: string) => void;
  declinedVideoFile: File | null;
  setDeclinedVideoFile: (file: File | null) => void;
  declinedUploadProgress: number;
  setDeclinedUploadProgress: (progress: number) => void;
  declinedFileInputRef: React.RefObject<HTMLInputElement>;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  selectedService: string | null;
  selectedSize: string | null;
}) => {
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 200 * 1024 * 1024) {
        alert("Video file size must be less than 200MB");
        e.target.value = "";
        return;
      }
      if (!file.type.startsWith("video/")) {
        alert("File must be a video");
        e.target.value = "";
        return;
      }
      setDeclinedVideoFile(file);
    }
  };

  const resetDeclinedForm = () => {
    setDeclinedName("");
    setDeclinedEmail("");
    setDeclinedPhone("");
    setDeclinedDetails("");
    setDeclinedVideoFile(null);
    setDeclinedUploadProgress(0);
    if (declinedFileInputRef.current) {
      declinedFileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", sanitizeInput(declinedName));
      formData.append("email", declinedEmail.toLowerCase().trim());
      formData.append("phone", declinedPhone.replace(/\D/g, ""));
      formData.append("details", sanitizeInput(declinedDetails));
      formData.append("service", selectedService || "");
      formData.append("size", selectedSize || "");
      formData.append("collection", "mowingDeclinedLeads");
      formData.append("status", "declined");

      if (declinedVideoFile) {
        const storageRef = ref(
          storage,
          `videos/${Date.now()}-${declinedVideoFile.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, declinedVideoFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setDeclinedUploadProgress(progress);
          },
          (error) => {
            console.error("Upload error:", error);
            throw new Error("Failed to upload video");
          }
        );

        await uploadTask;
        const videoUrl = await getDownloadURL(storageRef);
        formData.append("videoUrl", videoUrl);
      }

      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      //alert("Thank you! Your submission has been received.");
      resetDeclinedForm();
      router.push("/submission-success");
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-32 px-4">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-[#0cabba]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={declinedName}
              onChange={(e) => setDeclinedName(e.target.value)}
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
              {!declinedPhone && <span className="text-red-500">*</span>}
            </label>
            <input
              type="email"
              value={declinedEmail}
              onChange={(e) => setDeclinedEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
              placeholder="Enter your email address"
              required={!declinedPhone}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Enter your phone number{" "}
              {!declinedEmail && <span className="text-red-500">*</span>}
            </label>
            <input
              type="tel"
              value={declinedPhone}
              onChange={(e) => handlePhoneChange(e, setDeclinedPhone)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
              placeholder="123-456-7890"
              maxLength={14}
              required={!declinedEmail}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Describe your yard details:
              <span className="text-sm text-gray-500 ml-1">
                {getCharacterCountText(declinedDetails.length)}
              </span>
            </label>
            <textarea
              value={declinedDetails}
              onChange={(e) => handleDetailsChange(e, setDeclinedDetails)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
              rows={4}
              placeholder="Please tell us about your yard..."
              maxLength={MAX_DETAILS_LENGTH}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Upload a video of your lawn:
            </label>
            <input
              ref={declinedFileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
            />
            {declinedUploadProgress > 0 && declinedUploadProgress < 100 && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#0cabba] h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${declinedUploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Uploading: {declinedUploadProgress.toFixed(0)}%
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
  );
};

// Move LandscapingForm outside of QuotePage component
const LandscapingForm = ({
  landscapingName,
  setLandscapingName,
  landscapingEmail,
  setLandscapingEmail,
  landscapingPhone,
  setLandscapingPhone,
  landscapingDetails,
  setLandscapingDetails,
  landscapingVideoFile,
  setLandscapingVideoFile,
  landscapingUploadProgress,
  setLandscapingUploadProgress,
  landscapingFileInputRef,
  isSubmitting,
  setIsSubmitting,
  selectedService,
}: {
  landscapingName: string;
  setLandscapingName: (name: string) => void;
  landscapingEmail: string;
  setLandscapingEmail: (email: string) => void;
  landscapingPhone: string;
  setLandscapingPhone: (phone: string) => void;
  landscapingDetails: string;
  setLandscapingDetails: (details: string) => void;
  landscapingVideoFile: File | null;
  setLandscapingVideoFile: (file: File | null) => void;
  landscapingUploadProgress: number;
  setLandscapingUploadProgress: (progress: number) => void;
  landscapingFileInputRef: React.RefObject<HTMLInputElement>;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  selectedService: string | null;
}) => {
  const router = useRouter();

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "").substring(0, 10);
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPhone: (value: string) => void
  ) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedNumber);
  };

  const resetLandscapingForm = () => {
    setLandscapingName("");
    setLandscapingEmail("");
    setLandscapingPhone("");
    setLandscapingDetails("");
    setLandscapingVideoFile(null);
    setLandscapingUploadProgress(0);
    if (landscapingFileInputRef.current) {
      landscapingFileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", sanitizeInput(landscapingName));
      formData.append("email", landscapingEmail.toLowerCase().trim());
      formData.append("phone", landscapingPhone.replace(/\D/g, ""));
      formData.append("details", sanitizeInput(landscapingDetails));
      formData.append("service", selectedService || "");
      formData.append("collection", "landscapingLeads");

      if (landscapingVideoFile) {
        const storageRef = ref(
          storage,
          `videos/${Date.now()}-${landscapingVideoFile.name}`
        );
        const uploadTask = uploadBytesResumable(
          storageRef,
          landscapingVideoFile
        );

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setLandscapingUploadProgress(progress);
          },
          (error) => {
            console.error("Upload error:", error);
            throw new Error("Failed to upload video");
          }
        );

        await uploadTask;
        const videoUrl = await getDownloadURL(storageRef);
        formData.append("videoUrl", videoUrl);
      }

      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      //alert("Thank you! Your submission has been received.");
      resetLandscapingForm();
      router.push("/submission-success");
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-12 mb-6 px-4">
        <h2 className="text-2xl text-center font-semibold text-[#0cabba]">
          Tell us About Your Project
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
                value={landscapingName}
                onChange={(e) => setLandscapingName(e.target.value)}
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
                {!landscapingPhone && <span className="text-red-500">*</span>}
              </label>
              <input
                type="email"
                value={landscapingEmail}
                onChange={(e) => setLandscapingEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                placeholder="Enter your email address"
                required={!landscapingPhone}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Enter your phone number{" "}
                {!landscapingEmail && <span className="text-red-500">*</span>}
              </label>
              <input
                type="tel"
                value={landscapingPhone}
                onChange={(e) => handlePhoneChange(e, setLandscapingPhone)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                placeholder="123-456-7890"
                maxLength={14}
                required={!landscapingEmail}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Describe your project details:
                <span className="text-sm text-gray-500 ml-1">
                  {getCharacterCountText(landscapingDetails.length)}
                </span>
              </label>
              <textarea
                value={landscapingDetails}
                onChange={(e) => handleDetailsChange(e, setLandscapingDetails)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                rows={4}
                placeholder="Please tell us about your project..."
                maxLength={MAX_DETAILS_LENGTH}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Upload a video of your property:
              </label>
              <input
                ref={landscapingFileInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 200 * 1024 * 1024) {
                      alert("Video file size must be less than 200MB");
                      e.target.value = "";
                      return;
                    }
                    if (!file.type.startsWith("video/")) {
                      alert("File must be a video");
                      e.target.value = "";
                      return;
                    }
                    setLandscapingVideoFile(file);
                  }
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
              />
              {landscapingUploadProgress > 0 &&
                landscapingUploadProgress < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#0cabba] h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${landscapingUploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Uploading: {landscapingUploadProgress.toFixed(0)}%
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

export default function QuotePage() {
  // Add new refs for payment and declined form
  const yardSizeRef = useRef<HTMLDivElement>(null);
  const landscapingFormRef = useRef<HTMLDivElement>(null);
  const termsRef = useRef<HTMLDivElement>(null);
  const otherYardFormRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);
  const declinedFormRef = useRef<HTMLDivElement>(null);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [yardDetails, setYardDetails] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState<boolean | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [selectedFrequency, setSelectedFrequency] = useState<
    "weekly" | "biweekly" | null
  >(null);

  // Reference to file input for resetting
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add these state variables at the top level
  const [declinedName, setDeclinedName] = useState("");
  const [declinedEmail, setDeclinedEmail] = useState("");
  const [declinedPhone, setDeclinedPhone] = useState("");
  const [declinedDetails, setDeclinedDetails] = useState("");
  const [declinedVideoFile, setDeclinedVideoFile] = useState<File | null>(null);
  const [declinedUploadProgress, setDeclinedUploadProgress] = useState(0);
  const declinedFileInputRef = useRef<HTMLInputElement>(null);

  // In the QuotePage component, add new state for landscaping form
  const [landscapingName, setLandscapingName] = useState("");
  const [landscapingEmail, setLandscapingEmail] = useState("");
  const [landscapingPhone, setLandscapingPhone] = useState("");
  const [landscapingDetails, setLandscapingDetails] = useState("");
  const [landscapingVideoFile, setLandscapingVideoFile] = useState<File | null>(
    null
  );
  const [landscapingUploadProgress, setLandscapingUploadProgress] = useState(0);
  const landscapingFileInputRef = useRef<HTMLInputElement>(null);

  // Add state for notification
  const [showNotification, setShowNotification] = useState(false);

  // Add state for button colors
  const [acceptClicked, setAcceptClicked] = useState(false);
  const [declineClicked, setDeclineClicked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add this useEffect to watch for frequency changes
  useEffect(() => {
    if (acceptedTerms && selectedFrequency) {
      createCheckoutSession();
    }
  }, [selectedFrequency]);

  // Add useEffect to watch for size changes
  useEffect(() => {
    // Reset states when size changes
    setSelectedFrequency(null);
    setClientSecret("");
    setAcceptedTerms(null);
    setAcceptClicked(false); // Reset accept button state
    setDeclineClicked(false); // Reset decline button state
  }, [selectedSize]);

  // Add useEffect to watch for service changes
  useEffect(() => {
    // Reset all relevant states when service changes
    setSelectedSize(null);
    setSelectedFrequency(null);
    setClientSecret("");
    setAcceptedTerms(null);
    setAcceptClicked(false); // Reset accept button state
    setDeclineClicked(false); // Reset decline button state
  }, [selectedService]);

  const handleServiceSelection = (service: string) => {
    setSelectedService(service);

    // Add small delay to ensure components are rendered
    setTimeout(() => {
      if (service === "mowing" && yardSizeRef.current) {
        const yOffset = -150; // Adjust this value to control scroll position
        const element = yardSizeRef.current;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      } else if (service === "landscaping" && landscapingFormRef.current) {
        const yOffset = -150; // Adjust this value to control scroll position
        const element = landscapingFormRef.current;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleYardSizeSelection = (size: string) => {
    setSelectedSize(size.toLowerCase());

    // Add small delay to ensure components are rendered
    setTimeout(() => {
      if (size.toLowerCase() === "other" && otherYardFormRef.current) {
        const yOffset = -150;
        const element = otherYardFormRef.current;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      } else if (termsRef.current) {
        const yOffset = -150;
        const element = termsRef.current;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }, 100);
  };

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
      <div ref={yardSizeRef} className="mt-12 mb-32">
        <div className="mb-6">
          <h2 className="text-2xl text-center font-semibold text-[#0cabba]">
            Select Your Yard Size
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {sizeOptions.map((size) => (
            <div
              key={size.name}
              onClick={() => handleYardSizeSelection(size.name)}
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
                ${selectedSize === size.name.toLowerCase() ? "font-bold" : ""}`}
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
        if (!file.type.startsWith("video/")) {
          alert("File must be a video");
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
      setIsSubmitting(true);

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
        formData.append("name", sanitizeInput(name));
        if (email) formData.append("email", email.toLowerCase().trim());
        if (phone) formData.append("phone", phone.replace(/\D/g, ""));
        formData.append("service", selectedService || "");
        formData.append("size", selectedSize || "");
        formData.append("details", sanitizeInput(yardDetails));
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

        //alert("Thank you! Your submission has been received.");
        resetForm(); // Reset all form fields
        router.push("/submission-success");
      } catch (error) {
        console.error("Form submission error:", error);
        alert(error instanceof Error ? error.message : "Failed to submit form");
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <>
        <div
          ref={otherYardFormRef}
          className="max-w-4xl mx-auto mt-12 mb-6 px-4"
        >
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
                  Enter your phone number{" "}
                  {!email && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e, setPhone)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                  placeholder="123-456-7890"
                  maxLength={14}
                  required={!email}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Describe your yard details:
                  <span className="text-sm text-gray-500 ml-1">
                    {getCharacterCountText(yardDetails.length)}
                  </span>
                </label>
                <textarea
                  value={yardDetails}
                  onChange={(e) => handleDetailsChange(e, setYardDetails)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#0cabba] focus:border-[#0cabba]"
                  rows={4}
                  placeholder="Please tell us about your yard..."
                  maxLength={MAX_DETAILS_LENGTH}
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

  const createCheckoutSession = async () => {
    if (!selectedSize || !selectedFrequency) return;

    try {
      console.log("Creating checkout session...");
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          size: selectedSize,
          frequency: selectedFrequency,
        }),
      });
      const data = await response.json();
      //console.log("Checkout session created:", data);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const handleTermsDecision = (accepted: boolean) => {
    if (accepted && !selectedFrequency) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    setAcceptedTerms(accepted);

    if (accepted) {
      setAcceptClicked(true);
      setDeclineClicked(false);

      // Create checkout session first
      if (selectedFrequency) {
        createCheckoutSession().then(() => {
          // Only scroll after checkout session is created
          setTimeout(() => {
            if (paymentRef.current) {
              const yOffset = -100;
              const element = paymentRef.current;
              const y =
                element.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;

              window.scrollTo({
                top: y,
                behavior: "smooth",
              });
            }
          }, 100);
        });
      }
    } else {
      setDeclineClicked(true);
      setAcceptClicked(false);
      setTimeout(() => {
        if (declinedFormRef.current) {
          const yOffset = -100;
          const element = declinedFormRef.current;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  const TermsAndService = () => {
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
                Weekly service is required from March through May to maintain
                the health and appearance of your lawn during the peak growth
                season.
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
                After the first service, regular pricing will apply, but rates
                may be adjusted based on the scope of work needed to maintain
                the property.
              </li>
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={() => handleTermsDecision(true)}
              className={`w-72 px-8 py-3 rounded-lg border-2 font-medium transition-all duration-200 
                ${
                  acceptClicked
                    ? "bg-green-600 border-green-600 text-white hover:bg-green-700 hover:border-green-700"
                    : "bg-white border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                }`}
            >
              Accept for Payment
            </button>

            <button
              onClick={() => handleTermsDecision(false)}
              className={`w-72 px-8 py-3 rounded-lg border-2 font-medium transition-all duration-200
                ${
                  declineClicked
                    ? "bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600"
                    : "bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                }`}
            >
              Submit Details for Manual Review
            </button>
          </div>

          {showNotification && !selectedFrequency && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-[#0cabba] text-[#0cabba] px-4 py-2 rounded-lg shadow-lg whitespace-nowrap z-50 transition-all duration-300 ease-in-out">
              Please select a service frequency first
            </div>
          )}
        </div>
      </div>
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
        <div ref={termsRef} className="max-w-4xl mx-auto mt-12 mb-6 px-4">
          <h2 className="text-2xl text-center font-semibold text-[#0cabba]">
            Please Review our Terms and Conditions
          </h2>
        </div>
        <PricingDisplay
          size={selectedSize}
          selectedFrequency={selectedFrequency}
          setSelectedFrequency={setSelectedFrequency}
          setClientSecret={setClientSecret}
        />
        <TermsAndService />
        {clientSecret && acceptedTerms === true && (
          <div ref={paymentRef} className="max-w-2xl mx-auto mt-8 mb-32">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
        {acceptedTerms === false && (
          <div ref={declinedFormRef} className="mt-12">
            <div className="max-w-4xl mx-auto mb-6 px-4">
              <h2 className="text-2xl text-center font-semibold text-[#0cabba]">
                Please let us know why you declined our terms and conditions.
              </h2>
            </div>
            <DeclinedForm
              declinedName={declinedName}
              setDeclinedName={setDeclinedName}
              declinedEmail={declinedEmail}
              setDeclinedEmail={setDeclinedEmail}
              declinedPhone={declinedPhone}
              setDeclinedPhone={setDeclinedPhone}
              declinedDetails={declinedDetails}
              setDeclinedDetails={setDeclinedDetails}
              declinedVideoFile={declinedVideoFile}
              setDeclinedVideoFile={setDeclinedVideoFile}
              declinedUploadProgress={declinedUploadProgress}
              setDeclinedUploadProgress={setDeclinedUploadProgress}
              declinedFileInputRef={declinedFileInputRef}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              selectedService={selectedService}
              selectedSize={selectedSize}
            />
          </div>
        )}
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

              {/* Service Selection Boxes */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Mowing Service Box */}
                <div
                  className={`border rounded-lg cursor-pointer transition-all
                  hover:shadow-lg flex flex-col relative overflow-hidden
                  min-h-[400px] text-[#0cabba]
                  ${
                    selectedService === "mowing"
                      ? "border-[#0cabba] border-2 shadow-xl scale-[1.02]"
                      : "border-gray-200"
                  }
                `}
                  onClick={() => handleServiceSelection("mowing")}
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
                  className={`border rounded-lg cursor-pointer transition-all
                  hover:shadow-lg flex flex-col relative overflow-hidden
                  min-h-[400px] text-[#0cabba]
                  ${
                    selectedService === "landscaping"
                      ? "border-[#0cabba] border-2 shadow-xl scale-[1.02]"
                      : "border-gray-200"
                  }
                `}
                  onClick={() => handleServiceSelection("landscaping")}
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

            {/* Rest of the components */}
            {renderSizeOptions()}
            {renderPricing()}
            {renderOtherYardForm()}
            <div ref={landscapingFormRef}>
              {selectedService === "landscaping" && (
                <LandscapingForm
                  landscapingName={landscapingName}
                  setLandscapingName={setLandscapingName}
                  landscapingEmail={landscapingEmail}
                  setLandscapingEmail={setLandscapingEmail}
                  landscapingPhone={landscapingPhone}
                  setLandscapingPhone={setLandscapingPhone}
                  landscapingDetails={landscapingDetails}
                  setLandscapingDetails={setLandscapingDetails}
                  landscapingVideoFile={landscapingVideoFile}
                  setLandscapingVideoFile={setLandscapingVideoFile}
                  landscapingUploadProgress={landscapingUploadProgress}
                  setLandscapingUploadProgress={setLandscapingUploadProgress}
                  landscapingFileInputRef={landscapingFileInputRef}
                  isSubmitting={isSubmitting}
                  setIsSubmitting={setIsSubmitting}
                  selectedService={selectedService}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
