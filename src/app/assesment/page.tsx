"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ScoreCard from "../scorecard/page"; // Import ScoreCard component

export default function AssessmentComponent() {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const [scoreCard, setScoreCard] = useState(null); // State to store score card data
    const [loading, setLoading] = useState(true); // State to handle loading

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch("http://127.0.0.1:5000/generate_assessment");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log(data);

                const formattedQuestions = data.Questions.map((item) => {
                    const questionId = Object.keys(item)[0];
                    const questionText = item[questionId];
                    return {
                        id: questionId,
                        question: questionText,
                        options: {
                            a: item.a,
                            b: item.b,
                            c: item.c,
                            d: item.d,
                        },
                    };
                });

                setQuestions(formattedQuestions);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching questions:", error);
                setLoading(false); // Set loading to false if there's an error
            }
        }

        if (questions.length === 0) {
            fetchQuestions();
        }
    }, [questions]);

    const handleResponseChange = (questionId, answer) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [questionId]: answer,
        }));
    };

    const renderQuestion = (question) => {
        const options = Object.entries(question.options).map(([key, optionText]) => (
            <div key={key} className="flex items-center mt-2">
                <input
                    type="radio"
                    id={`question-${question.id}-option-${key}`}
                    name={`question-${question.id}`}
                    value={key}
                    checked={responses[question.id] === key}
                    className="mr-2"
                    onChange={() => handleResponseChange(question.id, key)}
                />
                <label htmlFor={`question-${question.id}-option-${key}`}>{optionText}</label>
            </div>
        ));

        return (
            <div>
                {options}
            </div>
        );
    };

    const handleSubmit = async () => {
        // Format responses as required
        const formattedResponses = Object.entries(responses)
            .map(([questionId, answer]) => `${questionId}:${answer}`)
            .join(", ");

        const payload = { user_responses: formattedResponses };

        console.log(JSON.stringify(payload));

        try {
            const response = await fetch("http://127.0.0.1:5000/get_feedback_summary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const feedbackInfo = await response.json();
                console.log(feedbackInfo)
                setScoreCard(feedbackInfo); // Store the feedback data in state
            } else {
                console.error("Failed to submit responses");
            }
        } catch (error) {
            console.error("Error submitting responses:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (scoreCard) {
        return <ScoreCard data={scoreCard} />; // Render ScoreCard component if scoreCard data is available
    }

    return (
        <div className="container mx-auto max-w-full bg-gray-800 px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Assessment</h1>
                    <p className="mt-2 text-muted-foreground">
                        Please answer the following questions to the best of your ability.
                    </p>
                </div>
                <div className="space-y-6">
                    {questions.map((question) => (
                        <div key={question.id}>
                            <label htmlFor={`question-${question.id}`} className="block font-medium">
                                {question.question}
                            </label>
                            {renderQuestion(question)}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end">
                    <Button
                        style={{ color: "white", background: "blue", borderRadius: "9999px" }}
                        onClick={handleSubmit}
                    >
                        Submit Assessment
                    </Button>
                </div>
            </div>
        </div>
    );
}
