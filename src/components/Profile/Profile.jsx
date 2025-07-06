import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500">
        You are not logged in. Please login to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>
      
      <div className="space-y-2">
        <div>
          <span className="font-semibold">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <div className="overflow-auto">
          <span className="font-semibold">Token:</span>
          <div className="text-xs break-all text-gray-500 bg-gray-100 p-2 rounded mt-1">
            {user.token}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
