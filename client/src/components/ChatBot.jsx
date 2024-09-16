import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function Chatbot() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const options = {
      method: 'POST',
      url: 'https://chatgpt-best-price.p.rapidapi.com/v1/chat/completions',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'c6150aa0fbmshc0a1461851bd7ecp100c48jsnac068272b7e6',
        'X-RapidAPI-Host': 'chatgpt-best-price.p.rapidapi.com'
      },
      data: {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: "I am using your APIs in my Rail Madad app as a chatbot, so be sure to answer all questions regarding rail and its services: " + inputValue
          }
        ]
      }
    };

    try {
      const response = await axios.request(options);
      const botResponse = response.data.choices[0].message.content;
      const botMessage = { text: botResponse, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = { text: "Sorry, I couldn't process your request. Please try again.", sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const closeChat = () => {
    setShowChat(false);
  };

  return (
    <div className="fixed bottom-5 right-5 font-['Poppins'] z-50">
      {!showChat && (
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300"
          onClick={toggleChat}
        >
          <i className="ri-chat-3-fill mr-2"></i> AI Chat
        </button>
      )}
      {showChat && (
        <div className="bg-white rounded-lg shadow-2xl w-80 overflow-hidden transition duration-300 transform scale-100">
          <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">AI Chat</h2>
            <button onClick={closeChat} className="hover:text-gray-300 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    message.sender === 'bot' 
                      ? 'bg-purple-100 text-purple-900' 
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                placeholder="Type your message here..."
                className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r-lg transition duration-300"
                disabled={isLoading}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;