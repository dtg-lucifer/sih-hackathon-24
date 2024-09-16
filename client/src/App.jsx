import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import GrievanceForm from './components/GrievanceForm';
import Footer from './components/Footer';
import Chatbot from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex justify-center w-full">
        <div className='w-full md:w-[80%] flex flex-col md:flex-row items-center md:items-start'>
          <Navigation />
          <div className="w-full md:w-3/4 flex justify-center">
            <GrievanceForm />
          </div>
        </div>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
