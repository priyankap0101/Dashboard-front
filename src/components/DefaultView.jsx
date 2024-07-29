// src/components/DefaultView.jsx
import React from 'react';

const DefaultView = () => (
  <div className="p-6">
    <div className="mb-8 text-center">
      <h2 className="mb-4 text-3xl font-semibold">Welcome to the CRM Dashboard</h2>
      <p className="mb-4 text-lg">
        With over a decade of experience in CRM solutions, we are excited to offer you a comprehensive tool to manage and optimize your user interactions.
      </p>
      <p className="text-lg">
        Here, you can efficiently manage profiles, register new users, and access a variety of features tailored to enhance your productivity. 
        Use the sidebar to explore and get started with the functionalities available.
      </p>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="p-4 bg-gray-200 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Manage Profiles</h3>
        <p className="mt-2">View, edit, and manage user profiles with a user-friendly interface.</p>
      </div>
      <div className="p-4 bg-gray-200 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Register New Users</h3>
        <p className="mt-2">Easily add new users and manage their access and roles.</p>
      </div>
      <div className="p-4 bg-gray-200 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Search Profiles</h3>
        <p className="mt-2">Utilize advanced search features to find specific profiles quickly.</p>
      </div>
    </div>
  </div>
);

export default DefaultView;
