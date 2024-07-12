
"use client"

import { useEffect, useState } from 'react';

export default function ScoreCard() {
  const [data, setData] = useState(null);
  

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3001/scorecard');
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { score, passPercentage, summary, areasForImprovement } = data;
  const isPass = score >= passPercentage;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative" style={{ background: '#E5E4E2' }}>
      <h1 className="absolute top-4 left-4 text-3xl font-bold">Score Card</h1>
      <div className="w-full max-w-10xl mx-auto p-1 md:p-12">
        <div className="bg-card rounded-lg shadow-lg p-12 grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="flex flex-col items-center justify-center">
            <div className="text-8xl font-bold mb-4 text-black">{score}</div>
            <div
              className={`px-8 py-3 rounded-full font-medium text-green-50`}
              style={{ background: isPass ? 'green' : 'red', borderRadius: '9999px', color: 'white' }}
            >
              {isPass ? 'Pass' : 'Fail'}
            </div>
            <div className="mt-2 px-4 py-2 rounded-full bg-gray-200 text-gray-700 font-medium">
              Pass percentage: {passPercentage}%
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Summary</h2>
              <p className="text-muted-foreground">
                {isPass
                  ? summary.pass.replace('{score}', score)
                  : summary.fail.replace('{score}', score)}
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Areas for Improvement</h2>
              <ul className="space-y-2">
                {areasForImprovement.map((area, index) => (
                  <li className="flex items-center gap-2" key={index}>
                    <a className="w-5 h-0 text-muted-foreground" />
                    <span className="text-muted-foreground">{area}</span>
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
