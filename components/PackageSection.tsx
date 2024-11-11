"use client";

import Link from "next/link";
import { useState } from "react";

export default function PackageSection() {
  const [activeTab, setActiveTab] = useState("standard");

  return (
    <section className="package-section">
      <div className="container">
        <div className="package-content">
          {/* Left side - Description */}
          <div className="package-info">
            <div className="title">
              <h2>Lawn Programs to fit your Goals</h2>
              <p>
                Get Greener Grass with Green Acres. Specialized lawn treatments,
                tailored just for your lawn.
              </p>
              <p>Choose from two programs, our Standard, Elite.</p>
            </div>

            {/* Package tabs */}
            <div className="package-tabs">
              <button
                className={`tab-button ${
                  activeTab === "standard" ? "active" : ""
                }`}
                onClick={() => setActiveTab("standard")}
              >
                Standard
              </button>
              <button
                className={`tab-button ${
                  activeTab === "elite" ? "active" : ""
                }`}
                onClick={() => setActiveTab("elite")}
              >
                Elite
              </button>
            </div>
          </div>

          {/* Right side - Package Details */}
          <div className="package-details">
            {/* Standard Package */}
            <div
              className={`package-card ${
                activeTab === "standard" ? "active" : ""
              }`}
            >
              <div className="card-header">
                <h2>Standard</h2>
              </div>
              <div className="card-body">
                <ul className="feature-list">
                  <li>4 applications</li>
                  <li>Crabgrass Pre- & Post-Emergent</li>
                  <li>Broadleaf Weed Control</li>
                </ul>
                <Link href="/contact" className="quote-button">
                  Request Quote
                </Link>
              </div>
            </div>

            {/* Elite Package */}
            <div
              className={`package-card ${
                activeTab === "elite" ? "active" : ""
              }`}
            >
              <div className="card-header">
                <h2>Elite</h2>
              </div>
              <div className="card-body">
                <ul className="feature-list">
                  <li>6 applications</li>
                  <li>Crabgrass Pre- & Post-Emergent</li>
                  <li>Broadleaf Weed Control</li>
                  <li>Core Aeration & Overseeding</li>
                </ul>
                <Link href="/contact" className="quote-button">
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
