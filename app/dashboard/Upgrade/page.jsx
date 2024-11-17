import React from 'react'
import PricingPlan from '../_components/PricingPlan'

function Upgrade() {
  return (
      <>
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div>
      {/* title */}
    <h2 className="text-3xl font-bold text-center text-black ">Upgrade</h2>
    <h2 className="text-md  text-center text-black mb-6">UpGrade to monthly plan to accesss unlimited mock interveiws</h2>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8 ">

                  <div className="rounded-2xl border border-gray-200 p-6 shadow-md sm:px-8 lg:p-12">
                      <div className="text-center">
                          <h2 className="text-lg font-medium text-gray-900">
                              Starter
                              <span className="sr-only">Plan</span>
                          </h2>

                          <p className="mt-2 sm:mt-4">
                              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">Free </strong>

                              <span className="text-sm  font-bold text-gray-700">0$</span>
                          </p>
                      </div>

                      <ul className="mt-6 space-y-2">
                          <li className="flex items-center gap-1">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-5 text-indigo-700"
                              >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>

                              <span className="text-gray-700"> Create 3 free Mock Interview </span>
                          </li>

                          <li className="flex items-center gap-1">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-5 text-indigo-700"
                              >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>

                              <span className="text-gray-700">Unlimited Retake Interview </span>
                          </li>

                          <li className="flex items-center gap-1">
                              
                

                              <span className="text-gray-700">✘ Practice Question</span>
                          </li>

                          <li className="flex items-center gap-1">
                              
            

                              <span className="text-gray-700"> ✘  Email Support</span>
                          </li>
                      </ul>

                      <a
                          href="/dashboard"
                          className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                      >
                          Get Started
                      </a>
            </div>
        <div className="rounded-2xl border border-indigo-600 p-2 shadow-md sm:px-8 lg:p-12">
                      <div className="text-center">
                          <h2 className="text-lg font-medium text-gray-900">
                              Starter
                              <span className="sr-only">Plan</span>
                          </h2>

                          <p className="mt-2 sm:mt-4">
                              <strong className="text-3xl font-bold text-gray-900 sm:text-xl">Monthly</strong>
                                <br></br>
                              <span className="sm:text-xl  font-bold text-gray-700">3.99$</span>
                          </p>
                      </div>

                      <ul className="mt-6 space-y-2">
                          <li className="flex items-center gap-1">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-5 text-indigo-700"
                              >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>

                              <span className="text-gray-700"> Unlimited free Mock Interview </span>
                          </li>

                          <li className="flex items-center gap-1">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-5 text-indigo-700"
                              >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>

                              <span className="text-gray-700">Unlimited Retake Interview </span>
                          </li>

                          <li className="flex items-center gap-1">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-5 text-indigo-700"
                              >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>

                              <span className="text-gray-700">Practice Question</span>
                          </li>

                          <li className="flex items-center gap-1">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-5 text-indigo-700"
                              >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>

                              <span className="text-gray-700">Email Support</span>
                          </li>
                      </ul>

                      <a
                          href="/dashboard"
                          className="mt-8 block rounded-full border border-indigo-600  bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                      >
                          Get Started
                      </a>
                  </div>
              </div>
              <div className='flex justify-center mt-20'>
         <h6> Prep-Genin. All rights reserved.</h6>
      </div>
</div>
      </>
  )
}

export default Upgrade
