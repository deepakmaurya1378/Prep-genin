import React from 'react'

function HowItWorks() {
  return (
    <div>
          <div className="p-10">
              
      <h2 className="text-2xl font-bold text-center text-black mb-2">How It Works</h2>
      <h2 className="text-md  text-center text-black mb-6">"Select a job role, take a mock interview with AI-generated questions, review your performance, and get personalized feedback to improve for real interviews."</h2>

      <div className="bg-grey p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Step 1: Create an Interview</h3>
        <p className="text-gray-600 mt-2">
          Create a new interview by specifying the job role or position, providing a detailed job description, and outlining the required years of experience. This information will help tailor the interview process to better match the job requirements.
        </p>
      </div>

      <div className="bg-grey p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Step 2: AI-Based Mock Interview</h3>
        <p className="text-gray-600 mt-2">
          Our AI-powered system will generate and ask you tailored questions based on the job role or position you’ve selected. By simulating a real-world interview scenario, it provides you with an interactive and dynamic interview experience, helping you better prepare for the actual interview. This approach allows you to practice in a realistic setting, build confidence, and refine your responses, ensuring you are ready for any challenge the interview may present.
        </p>
      </div>

      <div className="bg-grey-100 p-6 rounded-lg shadow-md mb-6 ">
        <h3 className="text-xl  font-semibold text-gray-800">Step 3: Review and Improve</h3>
        <p className="text-gray-600 mt-2">
          Once you’ve completed the mock interview, take the time to review your performance. Our system will provide you with detailed insights, including strengths and areas for improvement. You’ll receive personalized tips and recommendations to help you refine your responses and boost your performance in future interviews, ensuring you are well-prepared for real-world opportunities..
        </p>
      </div>

     
      <div className="text-center pt-10">
        <a href="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition-all">
           Start
        </a>
      </div>
      </div>
      <div className='flex justify-center mt-20'>
         <h6> Prep-Genin. All rights reserved.</h6>
      </div>
    </div>
  )
}

export default HowItWorks;
