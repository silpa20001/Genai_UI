"use client"

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import Link from 'next/link';

export default function AssessmentComponent() {
    const router = useRouter();
    const [questions, setQuestions] = useState([]);



    useEffect(() => {
        async function fetchQuestions() {
            const response = await fetch("http://localhost:3001/questions");
            const data = await response.json();
            setQuestions(data);
        }
        fetchQuestions();
    }, []);

    const renderQuestion = (question) => {
        switch (question.type) {
            case "text":
                return <Input id={`question-${question.id}`} type="text" placeholder={"Enter your answer"} className="mt-1 w-full" />;
            case "select":
                return (
                    <Select id={`question-${question.id}`} className="mt-1 w-full">
                        <SelectTrigger>
                            <SelectValue placeholder={"Select the correct one"} />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: 'white' }}>
                            {question.options.map((option, index) => (
                                <SelectItem key={index} value={option}>{option}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case "textarea":
                return <Textarea id={`question-${question.id}`} rows={3} placeholder={"Enter your answer"} className="mt-1 w-full" />;
            case "checkbox":
                return (
                    <div className="mt-2 space-y-2">
                        {question.options.map((option, index) => (
                            <div className="flex items-center gap-2" key={index}>
                                <Checkbox id={`goal-${index}`} />
                                <Label htmlFor={`goal-${index}`}>{option}</Label>
                            </div>
                        ))}
                    </div>
                );
            case "radio":
                return (
                    <div className="mt-2 space-y-2">
                        {question.options.map((option, index) => (
                            <div className="flex items-center gap-2" key={index}>
                                <input type="radio" id={`question-${question.id}-${index}`} name={`question-${question.id}`} value={option} />
                                <Label htmlFor={`question-${question.id}-${index}`}>{option}</Label>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };



    return (
        <div className="container mx-auto max-w-full px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
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
                    <Link href='/scorecard'><Button style={{ color: 'white', background: 'blue', borderRadius: '9999px' }}>
                        Submit Assessment
                    </Button></Link>
                </div>
            </div>
        </div>
    );
}
