import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Box } from '@mui/material';

const suggestionsMap = {
    aboutMeta: [
        { name: 'Meta Founder', question: 'Who founded Meta?', answer: 'Meta was founded by Mark Zuckerberg.' },
        { name: 'Meta\'s mission', question: 'What is Meta\'s mission?', answer: 'Meta\'s mission is to build technology that brings people closer together.' },
        { name: 'Meta Headquarter', question: 'Where is Meta headquartered?', answer: 'Meta is headquartered in Menlo Park, California, United States.' }
    ],
    process: [
        { name: 'Meta\'s process', question: 'What is Meta\'s product development process?', answer: 'Meta follows an iterative product development process focusing on user feedback and innovation.' },
        { name: 'Meta privacy', question: 'How does Meta ensure user privacy?', answer: 'Meta uses advanced security measures and privacy settings to protect user data.' },
        { name: 'Meta\'s hiring', question: 'What are the steps in Meta\'s hiring process?', answer: 'Meta\'s hiring process includes resume screening, interviews, and assessments.' }
    ],
    productsAndFeatures: [
        { name: 'Meta\'s products?', question: 'What are Meta\'s main products?', answer: 'Meta\'s main products include Facebook, Instagram, WhatsApp, and Oculus.' },
        { name: 'Meta products features', question: 'What features does Meta offer for businesses?', answer: 'Meta offers advertising solutions, business tools, and analytics for businesses.' },
        
    ],
    tools: [
        { name: 'Type of tools', question: 'how many types of tools are there?', answer: 'Meta provides various tools for developers, advertisers, and content creators.' }
    ]
};

const MainContent = ({ activeSection, isSidebarOpen }) => {
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [isSending, setIsSending] = useState(false);

    const handleSuggestionClick = (suggestion) => {
        setSelectedSuggestion(null);
        const userQuestion = { id: chatHistory.length + 1, question: suggestion.question, fromUser: true };
        setChatHistory([...chatHistory, userQuestion]);

        setTimeout(() => {
            const botAnswer = { id: chatHistory.length + 2, question: suggestion.question, answer: suggestion.answer };
            setChatHistory(prevHistory => [...prevHistory, botAnswer]);
            setSelectedSuggestion(suggestion);
            setShowSuggestions(false);
        }, 500);
    };

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSend = async () => {
        if (userInput.trim() !== '') {
            setIsSending(true);
            const newChat = [...chatHistory, { id: chatHistory.length + 1, question: userInput, fromUser: true }];
            setChatHistory(newChat);
            setUserInput('');

            try {
                const response = await fetch('http://127.0.0.1:5000/get_training_link', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user_query: userInput })
                });
                const data = await response.json();
                const updatedChat = [...newChat, { id: newChat.length + 1, question: userInput, answer: data || 'No data available' }];
                setChatHistory(updatedChat);
            } catch (error) {
                console.error('Error fetching data:', error);
                const updatedChat = [...newChat, { id: newChat.length + 1, question: userInput, answer: 'Error fetching data' }];
                setChatHistory(updatedChat);
            } finally {
                setIsSending(false);
            }
        }
    };
    const linkify = (text) => {
        const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(\b[-A-Z0-9+&@#\/%?=~_|!:,.;]*\.(mp4|pdf|com|in|org)\b)/ig;
        return text.replace(urlRegex, (url) => {
            let clickableUrl = url;
            if (!clickableUrl.startsWith('http')) {
                clickableUrl = 'http://' + clickableUrl;
            }
            return `<a href="${clickableUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });
    };
    

    return (
        <Stack spacing={2} direction="column" className={`content ${isSidebarOpen ? 'with-sidebar' : 'full-width'}`} style={{ minWidth: "calc(100vw - 230px)", minHeight: "calc(100vh - 72px)" }}>
            {chatHistory.map((message) => (
                <Box key={message.id} className={`chat-message my-3 ${message.fromUser ? '' : ''}`}>
                    {message.fromUser ? (
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"end"} gap={2} marginX={"10px"}>
                            <Box backgroundColor={"#615EF0"} color={"#FFF"} padding={"0.6rem"} borderRadius={"20px"}>
                                <p><strong></strong> {message.question}</p>
                            </Box>
                            <img src='/avatar.webp' width={40} style={{ borderRadius: "100%" }} />
                        </Stack>
                    ) : (
                        <Stack direction={"row"} alignItems={"center"} gap={2} marginX={"10px"}>
                            <img src='/bot.svg' width={40} />
                            <Box backgroundColor={"#fff"} padding={"0.6rem"} borderRadius={"20px"}>
                                <p dangerouslySetInnerHTML={{ __html: linkify(message.answer) }} />
                            </Box>
                        </Stack>
                    )}
                </Box>
            ))}
            {showSuggestions && activeSection && (
                <div className="center-content">
                    <div className="button-group">
                        {suggestionsMap[activeSection].map((suggestion, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion.name}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
            <div className="mt-auto">
                {isSending && <Stack alignItems="center" className="my-2">
                    <div className='loader'></div>
                </Stack>}
                <div className="sticky bottom-0 w-full bg-background py-2 px-4">
                    <form className="flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                        <OutlinedInput
                            className="chat-message-input"
                            variant="outlined"
                            sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button variant="contained" endIcon={<SendIcon />} disabled={isSending} onClick={handleSend} style={{ borderRadius: "21.5px" }}>
                                        Send
                                    </Button>
                                </InputAdornment>
                            }
                            value={userInput}
                            onChange={handleUserInput}
                        />
                    </form>
                </div>
            </div>
        </Stack>
    );
};

export default MainContent;
