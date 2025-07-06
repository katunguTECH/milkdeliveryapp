import React, { useState, useRef, useEffect } from 'react';

// Define the API key (Canvas will inject this at runtime)
const apiKey = ""; 
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

const OrderAssistant = () => {
  // State to manage the conversation history
  const [chatHistory, setChatHistory] = useState([]);
  // State to store the user's current input
  const [userInput, setUserInput] = useState('');
  // State to manage loading status during API calls
  const [isLoading, setIsLoading] = useState(false);
  // State to manage the recording status for voice input
  const [isRecording, setIsRecording] = useState(false);
  // Ref for the chat messages container to enable auto-scrolling
  const messagesEndRef = useRef(null);

  // Initialize SpeechRecognition (for voice input)
  // Use webkitSpeechRecognition for broader browser compatibility (especially Chrome)
  const recognitionRef = useRef(null);
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false; // Stop after a single utterance
      recognitionRef.current.interimResults = false; // Only return final results
      recognitionRef.current.lang = 'en-US'; // Set language

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
        console.log('Voice recognition started.');
        setChatHistory(prev => [...prev, { role: 'assistant', parts: [{ text: 'Listening...' }] }]);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript); // Set the recognized speech as user input
        console.log('Speech recognized:', transcript);
        // Automatically send the message after speech is recognized
        handleSendMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        console.log('Voice recognition ended.');
        // Remove "Listening..." message if no input was processed
        setChatHistory(prev => prev.filter(msg => msg.text !== 'Listening...'));
      };

      recognitionRef.current.onerror = (event) => {
        setIsRecording(false);
        console.error('Speech recognition error:', event.error);
        setChatHistory(prev => [...prev, { role: 'assistant', parts: [{ text: `Voice input error: ${event.error}` }] }]);
      };
    } else {
      console.warn('Web Speech API not supported in this browser.');
    }

    // Cleanup on component unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Scroll to the latest message whenever chatHistory updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Function to toggle voice recording
  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setUserInput(''); // Clear previous input before starting new recording
      recognitionRef.current.start();
    }
  };

  // Function to send message to the LLM
  const handleSendMessage = async (messageToSend = userInput) => {
    if (!messageToSend.trim() && !isRecording) return; // Don't send empty messages unless recording

    const newUserMessage = { role: 'user', parts: [{ text: messageToSend }] };
    // Add user message to history
    setChatHistory(prev => [...prev, newUserMessage]);
    setUserInput(''); // Clear input field

    setIsLoading(true); // Set loading state

    try {
      const payload = {
        contents: [...chatHistory, newUserMessage], // Send full conversation history
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const assistantResponse = result.candidates[0].content.parts[0].text;
        setChatHistory(prev => [...prev, { role: 'assistant', parts: [{ text: assistantResponse }] }]);
      } else {
        setChatHistory(prev => [...prev, { role: 'assistant', parts: [{ text: "Sorry, I couldn't get a response from the AI." }] }]);
        console.error("Unexpected API response structure:", result);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setChatHistory(prev => [...prev, { role: 'assistant', parts: [{ text: "There was an error connecting to the AI. Please try again." }] }]);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle Enter key press for sending messages
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl font-bold p-4 border-b">AI Order Assistant</h2>
      
      {/* Chat History Display */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.parts.map((part, pIdx) => (
                <span key={pIdx}>{part.text}</span>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg text-sm bg-gray-200 text-gray-800 rounded-bl-none">
              <div className="flex items-center">
                <span className="animate-pulse">Thinking...</span>
                <svg className="animate-spin ml-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* For auto-scrolling */}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t flex items-center space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your order or question..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading || isRecording}
        />
        <button
          onClick={() => handleSendMessage()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading || isRecording || !userInput.trim()}
        >
          Send
        </button>
        <button
          onClick={toggleRecording}
          className={`px-4 py-2 rounded-lg ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white disabled:opacity-50`}
          disabled={isLoading}
        >
          {isRecording ? (
            <svg className="w-5 h-5 inline-block animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7 4a3 3 0 00-3 3v6a3 3 0 003 3h6a3 3 0 003-3V7a3 3 0 00-3-3H7z" clipRule="evenodd"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7 4a3 3 0 00-3 3v6a3 3 0 003 3h6a3 3 0 003-3V7a3 3 0 00-3-3H7zM5 7a1 1 0 011-1h8a1 1 0 011 1v6a1 1 0 01-1 1H6a1 1 0 01-1-1V7z" clipRule="evenodd"></path>
            </svg>
          )}
          {isRecording ? 'Stop' : 'Voice'}
        </button>
      </div>
    </div>
  );
};

export default OrderAssistant;
