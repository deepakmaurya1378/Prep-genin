"use client"
import { UserButton } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';


function Dashboard() {

  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if 'firstVisit' flag exists in localStorage
    const isFirstTime = localStorage.getItem('firstVisit');

    if (!isFirstTime) {
      // If it's the first time, show 'Welcome' and set the flag
      setIsFirstVisit(true);
      localStorage.setItem('firstVisit', 'false');
    } else {
      // If it's not the first time, show 'Welcome Back'
      setIsFirstVisit(false);
    }
  }, []);
  return (
    <div className=" min-h-screen mt-10 ">
      {/* Header Section */}
      <h2 className='font-bold text-shadow-xl  text-blue-600 text-3xl pb-5'>Dashboard</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          {isFirstVisit ? "Welcome to Your Mock Interview!" : "Welcome Back!"}
        </h2>
        <p className="text-gray-600">
          {isFirstVisit 
            ? "Start by creating your first AI mock interview. Let’s help you prepare!" 
            : "Create and manage your AI mock interviews with ease. Start by creating a new interview or view your past interviews below."}
        </p>
      </div>

      {/* Add New Interview Section */}
      <section className="mb-10">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Create New Interview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AddNewInterview />
        </div>
      </section>

      {/* Interview List Section */}
      <section>
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">Your Interviews</h3>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <InterviewList />
        </div>
      </section>  
      <div className='flex justify-center mt-20'>
         <h6> Prep-Genin. All rights reserved.</h6>
      </div>
    </div>

  );
}

export default Dashboard;

