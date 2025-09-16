import React from "react";
import "../css/BookingSteps.css";

const BookingSteps = ({ currentStep }) => {
  const steps = ["영화/상영관 선택", "좌석 선택", "결제"];

  return (
    <div className="steps-container">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        return (
          <div
            key={index}
            className={`step-item ${
              currentStep === stepNumber
                ? "active"
                : currentStep > stepNumber
                ? "completed"
                : ""
            }`}
          >
            <div className="step-circle">
              {currentStep > stepNumber ? "✔" : stepNumber}
            </div>
            <span className="step-label">{step}</span>
            {index < steps.length - 1 && <div className="step-line"></div>}
          </div>
        );
      })}
    </div>
  );
};

export default BookingSteps;
