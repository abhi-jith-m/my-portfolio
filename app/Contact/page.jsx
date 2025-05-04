"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Code, Instagram, SendHorizontal, ArrowRight, Check } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus("success");
      setTimeout(() => {
        setFormStatus(null);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 ">
      <div className="w-full max-w-6xl bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-600/30 overflow-hidden transition-all duration-300 transform hover:shadow-purple-500/10">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel - Contact Info */}
          <div className="w-full md:w-2/5 lg:w-1/3 bg-gradient-to-br from-gray-900 to-purple-900/40 p-6 sm:p-8 flex flex-col">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-purple-200 mb-8 mt-4 relative">
                  CONTACT INFO
                  <span className="absolute -bottom-2 left-0 w-16 h-1 bg-purple-500 rounded-full"></span>
                </h2>
                
                <div className="space-y-6 text-gray-300 mt-8">
                  <div className="flex items-center group">
                    <div className="w-10 h-10 rounded-lg bg-purple-800/30 flex items-center justify-center mr-4 group-hover:bg-purple-700/50 transition-all duration-300">
                      <Mail className="text-purple-300" size={18} />
                    </div>
                    <a href="mailto:abhijith_m@hotmail.com" className="text-sm sm:text-base hover:text-purple-300 transition-colors">abhijith_m@hotmail.com</a>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="w-10 h-10 rounded-lg bg-purple-800/30 flex items-center justify-center mr-4 group-hover:bg-purple-700/50 transition-all duration-300">
                      <Phone className="text-purple-300" size={18} />
                    </div>
                    <a href="tel:+917306979561" className="text-sm sm:text-base hover:text-purple-300 transition-colors">+91 7306979561</a>
                  </div>
                  
                  <div className="flex items-center group">
                    <div className="w-10 h-10 rounded-lg bg-purple-800/30 flex items-center justify-center mr-4 group-hover:bg-purple-700/50 transition-all duration-300">
                      <MapPin className="text-purple-300" size={18} />
                    </div>
                    <span className="text-sm sm:text-base">Kollam, Kerala, India</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-purple-200 mb-8 relative">
                  CONNECT
                  <span className="absolute -bottom-2 left-0 w-16 h-1 bg-purple-500 rounded-full"></span>
                </h2>
                
                <div className="flex gap-4 mt-8">
                  {[
                    { Icon: Linkedin, label: "LinkedIn", color: "bg-blue-700/40 hover:bg-blue-600/60" },
                    { Icon: Code, label: "Code", color: "bg-gray-700/40 hover:bg-gray-600/60" },
                    { Icon: Instagram, label: "Instagram", color: "bg-pink-700/40 hover:bg-pink-600/60" }
                  ].map(({ Icon, label, color }, idx) => (
                    <a 
                      key={idx} 
                      href="#" 
                      aria-label={label}
                      className={`${color} p-3 rounded-lg text-white transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="w-full md:w-3/5 lg:w-2/3 p-6 sm:p-8 lg:p-12">
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Let's work <span className="text-purple-400">together.</span>
            </h2>
            <p className="text-gray-400 mb-8">Fill out the form below to start a conversation.</p>

            {formStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-lg animate-pulse">
                  <Check size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-200 mb-2">Message Sent!</h3>
                <p className="text-gray-300 text-center max-w-md">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 bg-gray-800/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-transparent transition-all shadow-inner backdrop-blur-md"
                    />
                    <div className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center rounded-full"></div>
                  </div>
                  
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="w-full px-4 py-3 bg-gray-800/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-transparent transition-all shadow-inner backdrop-blur-md"
                    />
                    <div className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center rounded-full"></div>
                  </div>
                </div>
                
                <div className="relative group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="w-full px-4 py-3 bg-gray-800/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-transparent transition-all shadow-inner backdrop-blur-md"
                  />
                  <div className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center rounded-full"></div>
                </div>
                
                <div className="relative group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/40 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-transparent transition-all shadow-inner backdrop-blur-md resize-none"
                  />
                  <div className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center rounded-full"></div>
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 rounded-lg font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/30 group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A8 8 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z" />
                      </svg>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span>Send Message</span>
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}