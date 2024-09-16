import React, { useState } from 'react';
import axios from 'axios';

function GrievanceForm() {
  const [journeyType, setJourneyType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);

  const generateOtp = async () => {
    try {
      await axios.post(process.env.REACT_APP_GENERATE_OTP_URL, { phoneNumber });
      setOtpSent(true);
    } catch (error) {
      console.error('Error generating OTP:', error);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_VERIFY_OTP_URL, { phoneNumber, code: otp });
      if (response.data.verified) {
        setVerified(true);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="w-[95%] md:w-3/4 px-4 py-6">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">Grievance Detail</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
            Mobile No.
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mobile"
            type="text"
            placeholder="Enter mobile number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {!otpSent && (
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={generateOtp}
            >
              Send OTP
            </button>
          )}
        </div>

        {otpSent && !verified && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
              OTP
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="journeyType">
            Journey Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="journeyType"
            onChange={(e) => setJourneyType(e.target.value)}
            disabled={!verified}
          >
            <option value="">Select Journey Type</option>
            <option value="PNR">PNR</option>
            <option value="UTS">UTS</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="journeyNumber">
            Journey Number
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="journeyNumber" 
            type="text" 
            placeholder="Enter journey number" 
            disabled={!verified}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="problemType">
            Problem Type
          </label>
          <select 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="problemType"
            disabled={!verified}
          >
            <option value="">Select Problem Type</option>
            <option value="cleanliness">Cleanliness</option>
            <option value="food">Food Quality</option>
            <option value="staff">Staff Behavior</option>
            <option value="delay">Train Delay</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="problemSubtype">
            Problem Subtype
          </label>
          <select 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="problemSubtype"
            disabled={!verified}
          >
            <option value="">Select Problem Subtype</option>
            <option value="toilet">Dirty Toilet</option>
            <option value="seat">Unclean Seat</option>
            <option value="ac">AC Not Working</option>
            <option value="overcharging">Overcharging</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="incidentDate">
            Date of Incident
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="incidentDate" 
            type="date"
            disabled={!verified}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileUpload">
            Upload Image/Video
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="fileUpload" 
            type="file" 
            accept="image/*,video/*"
            disabled={!verified}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description of Grievance
          </label>
          <textarea 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="description" 
            rows="4" 
            placeholder="Provide a detailed description of your grievance"
            disabled={!verified}
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button 
            className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="button"
            disabled={!verified}
          >
            Submit
          </button>
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="button"
            disabled={!verified}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default GrievanceForm;
