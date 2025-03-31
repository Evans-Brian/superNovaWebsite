'use client';

import { useState, FormEvent } from 'react';
import { Meteors } from './ui/meteors';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: 'voice-ai' // Default service
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setFormStatus({
      submitted: true,
      success: false,
      message: 'Submitting your request...'
    });
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you shortly.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: 'voice-ai'
      });
      
      // In a real implementation, this would send the data to a server
    }, 1500);
  };

  return (
    <div className="bg-neutral-950 rounded-lg shadow-md p-6 relative overflow-hidden">
      <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Contact Us</h2>
      
      {formStatus.submitted && formStatus.success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 relative z-10">
          <p>{formStatus.message}</p>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-gray-400 bg-gray-800 text-white"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-gray-400 bg-gray-800 text-white"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-gray-400 bg-gray-800 text-white"
          />
        </div>
        
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-gray-400 bg-gray-800 text-white"
          />
        </div>
        
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
            Service of Interest *
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-gray-400 bg-gray-800 text-white"
          >
            <option value="voice-ai">Voice Agent Solutions</option>
            <option value="process-automations">Process Automations</option>
            <option value="custom-integrations">Custom Integrations</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:border-gray-400 bg-gray-800 text-white"
          ></textarea>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={formStatus.submitted && !formStatus.success}
            className="w-full text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-50 hover:opacity-90"
            style={{ backgroundColor: 'rgb(102, 57, 218)' }}
          >
            {formStatus.submitted && !formStatus.success ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
      
      {/* Meteors effect */}
      <div className="absolute inset-0 z-0">
        <Meteors number={40} className="opacity-80" />
      </div>
    </div>
  );
}
