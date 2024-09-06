// services/otpService.js
import axios from 'axios';

const API_URL = 'https://otp-service-beta.vercel.app';

type propsOTP = {
    email: string;
    type: 'numeric' | 'alphanumeric' | 'alphabet';
    organization: string;
    subject: string
}

export const generateOTP = async ({email, type, organization, subject}: propsOTP) => {
  try {
    const response = await axios.post(`${API_URL}/api/otp/generate`, {
      email,
      type,
      organization,
      subject,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw error;
  }
};

export const verifyOTP = async (email: string, otp: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/otp/verify`, {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};
