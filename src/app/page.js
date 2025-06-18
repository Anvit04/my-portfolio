"use client";

import React, { useState, useEffect } from 'react';
import { Mail, ExternalLink, Github, Linkedin, Menu, X, Sun, Moon, ChevronUp } from 'lucide-react';
import { skills, projects } from "../constants/data";
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [formData, setFormData] = useState({
    "Full Name": '',
    "Email": '',
    "Phone Number": '',
    "Message": ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleProjects]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Theme-based classes
  const bgGradient = theme === 'dark'
    ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
    : 'bg-gradient-to-br from-[#fff]  to-[#fff]';

  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const secondaryTextColor = theme === 'dark' ? 'text-gray-300' : 'text-slate-700';
  const cardBg = theme === 'dark' ? 'bg-white/10 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg';
  const cardBorder = theme === 'dark' ? 'border border-white/10' : 'border border-slate-200';
  const hoverCard = theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-white';
  const headerBg = theme === 'dark' ? 'bg-slate-900/60 backdrop-blur-md border-transparent' : 'bg-white/60 backdrop-blur-md  border-[#e9e8e8]';
  const headerScrollBg = theme === 'dark' ? 'bg-slate-900/40 backdrop-blur-md shadow-lg border-transparent' : 'bg-white/40 backdrop-blur-md shadow-lg border-[#e9e8e8]';
  const sectionBg = theme === 'dark' ? 'bg-white/5 backdrop-blur-sm' : 'bg-slate-100/70 backdrop-blur-sm';
  const footerBorder = theme === 'dark' ? 'border-t border-white/10' : 'border-t border-slate-200';
  const footerText = theme === 'dark' ? 'text-gray-400' : 'text-slate-600';


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add this function to handle phone number input
  const handlePhoneInputChange = (e) => {
    const value = e.target.value;
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');

    // Limit to 10 digits
    const limitedDigits = digitsOnly.slice(0, 10);

    // Update the form data
    setFormData({
      ...formData,
      "Phone Number": limitedDigits
    });
  };

  // Updated validation function
  const isValidForm = () => {
    // Validate Full Name
    if (!formData["Full Name"]?.trim()) {
      alert("Please enter your name");
      return false;
    }

    // Validate Email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!formData["Email"] || !emailRegex.test(formData["Email"])) {
      alert("Please enter a valid email address");
      return false;
    }

    // Validate Phone Number - must be exactly 10 digits
    if (formData["Phone Number"] && formData["Phone Number"].length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return false;
    }

    // Optional: Check if phone number contains only digits
    if (formData["Phone Number"] && !/^\d{10}$/.test(formData["Phone Number"])) {
      alert("Phone number must contain only digits");
      return false;
    }

    return true;
  };


  // Updated handleSubmit function with better error handling
  const handleSubmit = async () => {
    if (!isValidForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Submitting form data:', formData);

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwITyCpNgWanRsmRW0xwCXv9c2udzlXZiuafFs4tjBmwG7dVg2nh27vOg0ofgeIJHg9/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          mode: 'no-cors' // Add this to handle CORS issues
        }
      );

      // Note: With no-cors mode, we can't read the response
      // So we'll assume success if no error is thrown
      console.log('Form submitted successfully');
      setSubmitStatus('success');

      // Reset form
      setFormData({
        "Full Name": '',
        "Email": '',
        "Phone Number": '',
        "Message": ''
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        closeModal();
        setSubmitStatus(null);
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to load more projects
  const loadMoreProjects = () => {
    setVisibleProjects(prev => prev + 3);
  };

  return (
    <>
      <div className={`min-h-screen ${bgGradient} ${textColor} overflow-x-hidden`}>
        {/* Header */}
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrollY > 10 ? headerScrollBg : headerBg
          }`}>
          <nav className="container-nw mx-auto px-3 2xl:px-0 py-4 flex justify-between items-center">
            <div className={`text-2xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} bg-clip-text text-transparent`}> ASC </div>

            <div className="flex items-center gap-4">

              {/* Desktop Navigation */}
              <ul className="hidden md:flex space-x-8">
                {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`relative ${theme === 'dark' ? 'hover:text-cyan-400 ' : 'hover:text-[#FF4D00]'} transition-colors duration-300 group cursor-pointer`}
                    >
                      {item}
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} transition-all duration-300 group-hover:w-full`}></span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="text-yellow-400" size={20} />
                ) : (
                  <Moon className="text-indigo-600" size={20} />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {/* {isMenuOpen && ( */}
          <div className={isMenuOpen ? `mobSideNav navOpen relative ${theme === 'dark' ? 'darker ' : 'lighter '}` : 'mobSideNav fixed'}>
            <div className={isMenuOpen ? `md:hidden h-full relative z-10  ${theme === 'dark' ? 'bg-slate-900/25 backdrop-blur-md ' : 'bg-white/25 backdrop-blur-md '}` : ''}>
              <ul className="py-4 px-6 space-y-4">
                {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`block w-full text-left ${theme === 'dark' ? 'hover:text-cyan-400 ' : 'hover:text-[#FF4D00]'} transition-colors duration-300 cursor-pointer`}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* )} */}
        </header>

        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 right-1/4 w-32 h-32 rounded-full animate-pulse ${theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-400/10 to-pink-500/10'
            : 'bg-gradient-to-r from-[#FF4D00]/20 to-[#FFB326]/20'
            }`}></div>
          <div className={`absolute top-3/4 right-1/12 w-48 h-48 rounded-full animate-bounce ${theme === 'dark'
            ? 'bg-gradient-to-r from-pink-500/10 to-cyan-400/10'
            : 'bg-gradient-to-r from-[#FFB326]/20 to-[#FF4D00]/20'
            }`} style={{ animationDelay: '-2s', animationDuration: '4s' }}></div>
          <div className={`absolute top-1/6 left-1/6 w-24 h-24 rounded-full animate-pulse ${theme === 'dark'
            ? 'bg-gradient-to-r from-cyan-400/10 to-pink-500/10'
            : 'bg-gradient-to-r from-[#FF4D00]/20 to-[#FFB326]/20'
            }`} style={{ animationDelay: '-1s' }}></div>
        </div>

        {/* Hero Section */}
        <section id="home" className=" min-h-[auto] md:min-h-screen pb-20 md:pb-0 pt-28 md:pt-0 flex items-start md:items-center justify-center md:justify-center px-3 sm:px-6 relative">
          <div className="container-nw mx-auto text-center z-10">
            <div className="animate-fade-in-up">
              <div className='flex justify-center flex-col lg:flex-row lg:justify-between gap-y-14'>
                <div className='text-left'>
                  <h1 className={`text-[32px] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.3] font-extrabold inline-block mb-2 md:mb-4 bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} bg-clip-text text-transparent`}>
                    Anvit Singh Chouhan
                  </h1>

                  <p className={`text-lg md:text-xl mb-8 lg:max-w-2xl lg:mx-auto ${secondaryTextColor} leading-relaxed`}>
                    Crafting exceptional digital experiences with 3+ years of expertise in modern web technologies.
                    From responsive designs to full-stack applications, I bring ideas to life with pixel-perfect precision.
                  </p>

                  <div className='flex items-center gap-3'>
                    <button
                      onClick={() => scrollToSection('projects')}
                      className={`inline-block min-w-36 text-sm md:text-base px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r cursor-pointer ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-400/25`}>
                      View My Work
                    </button>

                    <button
                      onClick={openModal}
                      className={`inline-flex min-w-36 text-sm md:text-base overflow-hidden p-0.5 bg-gradient-to-r cursor-pointer ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-400/25`}>
                      <span className={`px-5.5 py-2.5 md:px-7.5 md:py-3.5 ${bgGradient} rounded-full flex justify-center w-full`}> <sapn className={`bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} bg-clip-text text-transparent`}>Hire Me</sapn></span>
                    </button>
                  </div>
                </div>

                <div className='w-full max-w-100 mx-auto md:mx-0'>
                  <Image
                    className={`w-full max-w-60 xl:max-w-80 p-1 mx-auto rounded-full bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'}`}
                    src="/assets/img/anvit-office-nw.webp"
                    alt="A sample image"
                    width={600}
                    height={400}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-16 md:py-20 ${sectionBg}`}>
          <div className="container-nw mx-auto px-3 sm:px-6">
            <h2
              id="skills-title"
              data-animate
              className={`text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16 bg-gradient-to-r ${theme === 'dark' ? 'from-white to-cyan-400' : 'from-slate-900 to-cyan-600'
                } bg-clip-text text-transparent transition-all duration-700 ${visibleElements.has('skills-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Technical Expertise
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <div
                  key={skill.title}
                  id={`skill-${index}`}
                  data-animate
                  className={`${cardBg} ${cardBorder} p-6 md:p-8 rounded-2xl hover:scale-105 transition-all duration-400 cursor-pointer group hover:shadow-2xl ${theme === 'dark' ? 'hover:shadow-cyan-400/20' : 'hover:shadow-slate-300'
                    } ${visibleElements.has(`skill-${index}`)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                    } ${hoverCard}`} >
                  <div className={`text-4xl mb-4 w-16 h-16 bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-4  bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-200 to-cyan-400 group-hover:from-cyan-400 group-hover:to-pink-500' : 'from-slate-900 to-cyan-800 group-hover:from-[#FF4D00] group-hover:to-[#FFB326]'
                    } bg-clip-text text-transparent transition-colors duration-400`}>
                    {skill.title}
                  </h3>
                  <p className={`${secondaryTextColor} leading-relaxed`}>
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-20">
          <div className="container-nw mx-auto px-3 sm:px-6">
            <h2
              id="projects-title"
              data-animate
              className={`text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16 bg-gradient-to-r ${theme === 'dark' ? 'from-white to-cyan-400' : 'from-slate-900 to-cyan-600'
                } bg-clip-text text-transparent transition-all duration-700 ${visibleElements.has('projects-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, visibleProjects).map((project, index) => (
                <div
                  key={project.title}
                  id={`project-${index}`}
                  data-animate
                  className={`${cardBg} ${cardBorder} rounded-2xl overflow-hidden hover:scale-103 transition-all duration-400 group hover:shadow-2xl ${theme === 'dark' ? 'hover:shadow-pink-500/20' : 'hover:shadow-slate-300'
                    } ${visibleElements.has(`project-${index}`)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                    }`}
                >
                  <div className={`h-48 ${cardBorder} border-b border-t-0 border-l-0 border-r-0 overflow-hidden`}>
                    <div className={` h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-400`}
                      style={{ backgroundImage: `url(${project.proImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className={`text-xl font-semibold mb-3 bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-200 to-cyan-400 group-hover:from-cyan-400 group-hover:to-pink-500' : 'from-slate-900 to-cyan-800 group-hover:from-[#FF4D00] group-hover:to-[#FFB326]'
                      } bg-clip-text text-transparent inline-block transition-colors duration-400`}>
                      {project.title}
                    </h3>
                    <p className={`${secondaryTextColor} mb-6 leading-relaxed line-clamp-3 max-w-[100%] overflow-hidden text-ellipsis`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 ${theme === 'dark' ? 'border-cyan-400/30 bg-cyan-400/20 text-cyan-400' : 'text-[#FF4D00] bg-[#FFB326]/20 border-[#FFB326]/30'} rounded-full text-sm border `}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link href={project.proLink} target='_blank' className={`font-semibold ${theme === 'dark' ? 'text-cyan-400 ' : 'text-cyan-800 '} transition-colors hover:underline duration-400 inline-flex items-center gap-2`}>
                      View Project <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {visibleProjects < projects.length && (
              <div className="col-span-full flex justify-center mt-10">
                <button
                  onClick={loadMoreProjects}
                  className={`px-6 py-2.5 ${cardBg} ${cardBorder} rounded-full text-sm cursor-pointer font-medium hover:scale-105 transition-transform ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-white/90'}`}>
                  Load More
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-16 md:py-20 ${sectionBg}`}>
          <div className="container-nw mx-auto px-3 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2
                id="contact-title"
                data-animate
                className={`text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r ${theme === 'dark' ? 'from-white to-cyan-400' : 'from-slate-900 to-cyan-600'
                  } bg-clip-text text-transparent transition-all duration-700 ${visibleElements.has('contact-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
              >
                Let&#39;s Create Something Amazing
              </h2>
              <p
                id="contact-description"
                data-animate
                className={`text-lg md:text-xl mb-12 ${secondaryTextColor} leading-relaxed transition-all duration-700 ${visibleElements.has('contact-description') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: '200ms' }}
              >
                Ready to bring your vision to life? I&#39;m always excited to work on new projects and collaborate with innovative teams.
              </p>

              <div
                id="contact-buttons"
                data-animate
                className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-700 ${visibleElements.has('contact-buttons') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: '400ms' }}
              >
                <button onClick={openModal} className="flex items-center cursor-pointer gap-3 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25">
                  <Mail size={20} />
                  Send Email
                </button>
                <button className="flex items-center cursor-pointer gap-3 px-8 py-4 border-2 border-pink-500 text-pink-500 font-semibold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25">
                  <Github size={20} />
                  View Resume
                </button>
                <Link href={`https://www.linkedin.com/in/anvit-singh-chouhan-961b411bb/`} target='_blank' className="flex items-center cursor-pointer gap-3 px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-400/25">
                  <Linkedin size={20} />
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-8 ${footerBorder}`}>
          <div className={`container-nw mx-auto px-3 sm:px-6 text-center ${footerText}`}>
            <p>&copy; 2025 Anvit Singh Chouhan. Designed & Developed with passion using Next.js.</p>
          </div>
        </footer>

        {scrollY > 50 ?
          <button
            onClick={() => scrollToSection('home')}
            className={`fixed bottom-20 md:bottom-10 right-10 transition-all ${scrollY > 120 ? 'opacity-100' : 'opacity-0'} flex justify-center items-center rounded-full text-white w-9 h-9 bg-gradient-to-r cursor-pointer ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'}`}>
            <ChevronUp />
          </button>
          : ''
        }

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/25 backdrop-blur-sm bg-opacity-50 z-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
              />

              {/* Modal content */}
              <motion.div
                className={`fixed z-80 top-1/2 left-1/2 w-11/12 max-w-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-xl transform -translate-x-1/2 -translate-y-1/2`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`${theme === 'dark' ? 'text-gray-100 border-white/25' : 'text-gray-800 border-slate-300'} flex justify-between px-4 py-2 border-[1px] border-t-0 border-l-0 border-r-0`}>
                  <h2 className={`text-xl font-medium mb-0 `}>Start a project</h2>
                  <span className='block cursor-pointer text-sm text-gray-400' onClick={closeModal}><X /></span>
                </div>


                <div className='px-4 py-5 flex flex-wrap gap-3.5'>
                  <div className='w-full px-1.5'>
                    <p className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Have a project that we could work together on? I would love to talk!</p>
                  </div>
                  <div className='w-full px-1.5'>
                    <div className={`flex items-center ${theme === 'dark' ? 'bg-gray-600 outline-gray-800 has-[input:focus-within]:outline-cyan-400' : 'bg-white outline-gray-300 has-[input:focus-within]:outline-[#FF4D00]'}  pl-3 outline-1 -outline-offset-1  has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 `}>
                      <input
                        id="fullname"
                        name="Full Name"
                        value={formData["Full Name"]}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Full Name"
                        className={`block min-w-0 grow py-1.5 pr-3 pl-1 text-base ${theme === 'dark' ? 'text-white placeholder:text-gray-200' : 'text-gray-900 placeholder:text-gray-400'}  focus:outline-none sm:text-sm/6`}
                      />
                    </div>
                  </div>

                  <div className='w-full px-1.5'>
                    <div className={`flex items-center ${theme === 'dark' ? 'bg-gray-600 outline-gray-800 has-[input:focus-within]:outline-cyan-400' : 'bg-white outline-gray-300 has-[input:focus-within]:outline-[#FF4D00]'}  pl-3 outline-1 -outline-offset-1  has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 `}>
                      <input
                        id="email"
                        name="Email"
                        value={formData["Email"]}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="Email"
                        className={`block min-w-0 grow py-1.5 pr-3 pl-1 text-base ${theme === 'dark' ? 'text-white placeholder:text-gray-200' : 'text-gray-900 placeholder:text-gray-400'}  focus:outline-none sm:text-sm/6`}
                      />
                    </div>
                  </div>

                  <div className='w-full px-1.5'>
                    <div className={`flex items-center ${theme === 'dark' ? 'bg-gray-600 outline-gray-800 has-[input:focus-within]:outline-cyan-400' : 'bg-white outline-gray-300 has-[input:focus-within]:outline-[#FF4D00]'}  pl-3 outline-1 -outline-offset-1  has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 `}>
                      <input
                        id="phoneno"
                        name="Phone Number"
                        value={formData["Phone Number"]}
                        onChange={handlePhoneInputChange}
                        type="tel"
                        placeholder="Phone Number"
                        maxLength="10"
                        pattern="[0-9]{10}"
                        className={`block min-w-0 grow py-1.5 pr-3 pl-1 text-base ${theme === 'dark' ? 'text-white placeholder:text-gray-200' : 'text-gray-900 placeholder:text-gray-400'}  focus:outline-none sm:text-sm/6`}
                      />
                    </div>
                  </div>

                  <div className='w-full px-1.5'>
                    <div className={`flex items-center ${theme === 'dark' ? 'bg-gray-600 outline-gray-800 has-[textarea:focus-within]:outline-cyan-400' : 'bg-white outline-gray-300 has-[textarea:focus-within]:outline-[#FF4D00]'}  pl-3 outline-1 -outline-offset-1  has-[textarea:focus-within]:outline-2 has-[textarea:focus-within]:-outline-offset-2 `}>
                      <textarea
                        id="message"
                        name="Message"
                        value={formData["Message"]}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Enter a brief description of your project"
                        className={`block min-w-0 grow py-1.5 pr-3 pl-1 text-base ${theme === 'dark' ? 'text-white placeholder:text-gray-200' : 'text-gray-900 placeholder:text-gray-400'}  focus:outline-none sm:text-sm/6`}
                      />
                    </div>
                  </div>
                </div>

                {/* Status Message */}
                {submitStatus === 'success' && (
                  <div className='mb-4'>
                    <p className={`px-4 py-2 text-center w-11/12 mx-auto rounded-sm text-sm bg-gradient-to-r text-white from-green-400 to-green-700 `}>
                      Submitted successfully!
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className='mb-4'>
                    <p className={`px-4 py-2 text-center w-11/12 mx-auto rounded-sm text-sm bg-gradient-to-r text-white from-red-400 to-red-700 `}>
                      Error submitting form. Please try again.
                    </p>
                  </div>
                )}


                <div className={`${theme === 'dark' ? 'border-white/25' : 'border-slate-300'} flex gap-2.5 px-4 py-2 border-[1px] border-b-0 border-l-0 border-r-0`}>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-sm cursor-pointer min-w-26 max-w-26 w-[120px] bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} text-white rounded-full hover:scale-105 transition-transform`}>
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>

                  <button
                    onClick={closeModal}
                    className={`px-4 py-2 text-sm cursor-pointer min-w-26 max-w-26 w-[120px] bg-gradient-to-r from-slate-300 to-slate-400 text-black rounded-full hover:scale-105 transition-transform`}>
                    Cancel
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
      </div>
    </>
  );
}
