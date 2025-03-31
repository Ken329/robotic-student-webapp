import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  forgotPassword,
  resetPasswordWithOTP,
} from "../../../services/awsAuth";

const useForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [step, setStep] = useState(1);

  const handleForgotPassword = async ({ email }) => {
    setError(null);
    setCurrentEmail(email);
    setLoading(true);
    try {
      await forgotPassword(email);
      setStep(2);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async ({ newPassword, otp }) => {
    setError(null);
    setLoading(true);
    try {
      await resetPasswordWithOTP(currentEmail, newPassword, otp);
      navigate("/login");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    step,
    currentEmail,
    setStep,
    handleForgotPassword,
    handleResetPassword,
  };
};

export default useForgotPassword;
