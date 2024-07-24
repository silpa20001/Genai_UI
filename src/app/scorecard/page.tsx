"use client"

export default function ScoreCard({data}) {
  

  const { percentage_score, areas_of_improvement } = data;
  const isPass = percentage_score >= 50; // Assuming 50% as the passing mark
  const incorrectAnswersCount = Object.keys(areas_of_improvement).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-10 relative" style={{ background: '#E5E4E2' }}>
      <h1 className="absolute top-4 left-4 text-3xl font-bold">Assessment Score </h1>
      <div className="w-full max-w-10xl mx-auto p-1 md:p-12">
        <div className="bg-card rounded-lg shadow-lg p-12 grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="flex flex-col items-center justify-center">
            <div className="text-8xl font-bold mb-4 text-black">{percentage_score}%</div>
            <div
              className={`px-8 py-3 rounded-full font-medium text-green-50`}
              style={{ background: isPass ? 'green' : 'red', borderRadius: '9999px', color: 'white' }}
            >
              {isPass ? 'Pass' : 'Fail'}
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Areas of Improvement</h2>
              <p className="text-gray-600">You have {incorrectAnswersCount} incorrect {incorrectAnswersCount === 1 ? 'answer' : 'answers'}:</p>
              <ul className="space-y-2">
                {Object.keys(areas_of_improvement).map((questionKey, index) => (
                  <li className="flex items-start" key={index}>
                    <div className="font-semibold">{questionKey}:</div>
                    <div className="ml-2">
                      <div className="text-gray-600 mb-1">Your Answer: {areas_of_improvement[questionKey].user_answer}</div>
                      <div className="text-gray-600">Correct Answer: {areas_of_improvement[questionKey].correct_answer}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
