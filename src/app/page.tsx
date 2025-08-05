'use client';

import { useState } from 'react';
import { Send, Scale, BookOpen, Users, Shield, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface LegalArea {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const legalAreas: LegalArea[] = [
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Contract Law",
      description: "Contract disputes, terms, and agreements",
      examples: ["What makes a contract legally binding?", "Can I break a lease early?"]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Criminal Law",
      description: "Criminal charges and defense strategies",
      examples: ["What are my rights during arrest?", "Difference between felony and misdemeanor?"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Family Law",
      description: "Divorce, custody, and family matters",
      examples: ["How is child custody determined?", "What is community property?"]
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Employment Law",
      description: "Workplace rights and employment issues",
      examples: ["Can I be fired without cause?", "What constitutes workplace harassment?"]
    }
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response with legal knowledge
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateLegalResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateLegalResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('contract') || lowerQuestion.includes('agreement')) {
      return "A legally binding contract typically requires: (1) Offer and acceptance, (2) Consideration (something of value exchanged), (3) Legal capacity of parties, and (4) Legal purpose. For specific contract disputes, I recommend consulting with a contract attorney who can review the actual terms and circumstances. Remember, this is general information and not legal advice for your specific situation.";
    }
    
    if (lowerQuestion.includes('arrest') || lowerQuestion.includes('rights')) {
      return "During an arrest, you have several important rights: (1) Right to remain silent, (2) Right to an attorney, (3) Right to know the charges against you, (4) Right to refuse searches without a warrant (with some exceptions). Always exercise these rights respectfully. For specific criminal matters, contact a criminal defense attorney immediately.";
    }
    
    if (lowerQuestion.includes('custody') || lowerQuestion.includes('child')) {
      return "Child custody decisions are typically based on the 'best interests of the child' standard, considering factors like: parental fitness, stability of home environment, child's preferences (if age-appropriate), and existing parent-child relationships. Courts may award joint or sole custody. Family law varies significantly by state, so consult a local family law attorney.";
    }
    
    if (lowerQuestion.includes('fired') || lowerQuestion.includes('employment')) {
      return "Employment termination laws vary by state. Most employment is 'at-will,' meaning employers can terminate for any legal reason or no reason. However, termination cannot be for illegal reasons like discrimination, retaliation, or violation of public policy. If you believe you were wrongfully terminated, document everything and consult an employment attorney.";
    }
    
    return "Thank you for your legal question. While I can provide general legal information, every situation is unique and requires specific analysis. I recommend consulting with a qualified attorney who can review your particular circumstances and provide personalized legal advice. Legal matters often have time-sensitive deadlines, so don't delay in seeking professional help if needed.";
  };

  const handleExampleClick = (example: string) => {
    setInputText(example);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Legal Assistant</h1>
              <p className="text-sm text-gray-600">Professional legal guidance at your fingertips</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Legal Areas Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Legal Areas</h2>
              <div className="space-y-4">
                {legalAreas.map((area, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-600 mt-1">
                        {area.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{area.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{area.description}</p>
                        <div className="space-y-1">
                          {area.examples.map((example, exIndex) => (
                            <button
                              key={exIndex}
                              onClick={() => handleExampleClick(example)}
                              className="block text-xs text-blue-600 hover:text-blue-800 hover:underline text-left"
                            >
                              "{example}"
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Legal Disclaimer</p>
                    <p className="text-xs text-amber-700 mt-1">
                      This AI provides general legal information only, not legal advice. 
                      Consult a qualified attorney for your specific situation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <h2 className="font-semibold text-gray-900">Legal Consultation Chat</h2>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <Scale className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to AI Legal Assistant</h3>
                    <p className="text-gray-600 mb-4">Ask any legal question to get started. Click on examples from the sidebar or type your own question.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                      <button
                        onClick={() => handleExampleClick("What are my rights as a tenant?")}
                        className="p-3 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        Tenant Rights
                      </button>
                      <button
                        onClick={() => handleExampleClick("How do I start a small business legally?")}
                        className="p-3 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        Business Formation
                      </button>
                    </div>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isUser
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.isUser ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask your legal question here..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}