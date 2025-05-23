import { Lightbulb, Volume, Volume2 } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';


function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [active, setActive] = useState(0);
  console.log("Received Questions:", mockInterviewQuestion);
  const hasSpoken = false;
  const textToSpeach = (text) => {
    if ( !hasSpoken && 'speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
      // hasSpoken = true;
    }
    else {
      alert('Sorry, Your browser does not support text to speech');
    }
  }

  return mockInterviewQuestion&&(
    <div className="p-5 border shadow-md bg-gray-50 rounded-lg my-10">
      {/* Check if mockInterviewQuestion exists and is an array */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5'>
        {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (   
        <h2
          key={question.id || index}
          className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer 
          ${activeQuestionIndex === index ? 'bg-blue-400 ' : 'bg-secondary'}`}>
            Question #{index + 1}
        </h2>))}
          </div>
          <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
          <Volume2 className='cursor-pointer' onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
          <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
              <h2 className='flex gap-2 items-center text-primary'>
                  <Lightbulb />
                  <strong>Note:</strong>
              </h2>
              <h2 className='text-sm text-blue-500 my-2'>{ process.env.NEXT_PUBLIC_QUESTION_NOTE }</h2>
          </div>
    </div>
  );
}

export default QuestionSection;
