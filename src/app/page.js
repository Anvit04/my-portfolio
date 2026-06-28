"use client";

import React, { useState, useEffect } from 'react';
import { Mail, ExternalLink, Linkedin, ChevronUp, FileUser } from 'lucide-react';
import { skills, projects } from "../constants/data";
import Link from 'next/link';
import Image from 'next/image';
import FloatAnimation from '@/common/FloatAnimation/page';
import Header from '@/common/Header/page';
import Footer from '@/common/Footer/page';
import HireModal from '@/common/HireModal/page';
import Tilt3D from '@/common/Tilt3D/page';

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
        <Header
          scrollSecOnClick={scrollToSection}
          scrollY={scrollY}
          headerScrollBg={headerScrollBg}
          headerBg={headerBg}
          isMenuOpen={isMenuOpen}
          theme={theme}
          toggleThemeOnClick={toggleTheme}
          setIsMenuOpenOnClick={setIsMenuOpen}
        />


        {/* Floating Background Elements */}
        <FloatAnimation theme={theme} />

        {/* Hero Section */}
        <section id="home" className=" min-h-[auto] md:min-h-screen pb-20 md:pb-0 pt-28 md:pt-0 flex items-start md:items-center justify-center md:justify-center px-3 sm:px-6 relative">
          <div className="container-nw mx-auto text-center z-10">
            <div className="animate-fade-in-up">
              <div className='flex justify-center flex-col lg:flex-row lg:justify-between gap-y-10'>
                <div className='text-left'>
                  <h1 className={`text-[32px] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.3] font-extrabold inline-block mb-2 md:mb-4 bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} bg-clip-text text-transparent`}>
                    Anvit Singh Chouhan
                  </h1>

                  <p className={`text-lg md:text-xl md:mb-8 lg:max-w-2xl lg:mx-auto ${secondaryTextColor} leading-relaxed`}>
                    Crafting exceptional digital experiences with 4+ years of expertise in modern web technologies.
                    From responsive designs to full-stack applications, I bring ideas to life with pixel-perfect precision.
                  </p>

                  <div className=' hidden md:flex items-center gap-3'>
                    <button
                      onClick={() => scrollToSection('projects')}
                      className={`btn-3d inline-block min-w-36 text-sm md:text-base px-6 py-2.5 md:px-8 md:py-4 bg-gradient-to-r cursor-pointer ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-400/25`}>
                      View My Work
                    </button>

                    <button
                      onClick={openModal}
                      className={`btn-3d inline-flex min-w-36 text-sm md:text-base overflow-hidden p-0.5 bg-gradient-to-r cursor-pointer ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-400/25`}>
                      <span className={`px-5.5 py-2.5 md:px-7.5 md:py-3.5 ${bgGradient} rounded-full flex justify-center w-full`}> <sapn className={`bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} bg-clip-text text-transparent`}>Hire Me</sapn></span>
                    </button>
                  </div>
                </div>

                <Tilt3D className="w-full max-w-100 mx-auto md:mx-0 hero-float-3d" intensity={14}>
                  <div className="relative">
                    <div className={`absolute -inset-3 rounded-full bg-gradient-to-r opacity-40 blur-xl ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'}`} />
                    <Image
                      className={`relative w-full max-w-60 xl:max-w-80 p-1.5 aspect-square object-cover object-top mx-auto rounded-full bg-gradient-to-r shadow-2xl ${theme === 'dark' ? 'from-cyan-400 to-pink-500 shadow-cyan-500/20' : 'from-[#FF4D00] to-[#FFB326] shadow-orange-500/20'}`}
                      src="/assets/img/anvit_profestional.jpeg"
                      alt="Anvit Singh Chouhan - Frontend Developer"
                      width={600}
                      height={400}
                      priority
                    />
                  </div>
                </Tilt3D>

                <div className='flex md:hidden items-center justify-center gap-3'>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className={`btn-3d inline-block min-w-36 text-sm md:text-base px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r cursor-pointer ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-400/25`}>
                    View My Work
                  </button>

                  <button
                    onClick={openModal}
                    className={`btn-3d inline-flex min-w-36 text-sm md:text-base overflow-hidden p-0.5 bg-gradient-to-r cursor-pointer ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-400/25`}>
                    <span className={`px-5.5 py-2.5 md:px-7.5 md:py-3.5 ${bgGradient} rounded-full flex justify-center w-full`}> <sapn className={`bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} bg-clip-text text-transparent`}>Hire Me</sapn></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-19 md:py-20 ${sectionBg}`}>
          <div className="container-nw mx-auto px-3 sm:px-6">
            <h2
              id="skills-title"
              data-animate
              className={`section-title-3d text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16 bg-gradient-to-r ${theme === 'dark' ? 'from-white to-cyan-400' : 'from-slate-900 to-cyan-600'
                } bg-clip-text text-transparent transition-all duration-700 ${visibleElements.has('skills-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Technical Expertise
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-scene">
              {skills.map((skill, index) => (
                <Tilt3D key={skill.title} intensity={10} className="flex">
                  <div
                    id={`skill-${index}`}
                    data-animate
                    className={`card-3d relative ${cardBg} ${cardBorder} p-6 md:p-8 rounded-2xl transition-all duration-400 cursor-pointer group hover:shadow-2xl ${theme === 'dark' ? 'hover:shadow-cyan-400/20' : 'hover:shadow-slate-300'
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
                </Tilt3D>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-19 md:py-20">
          <div className="container-nw mx-auto px-3 sm:px-6">
            <h2
              id="projects-title"
              data-animate
              className={`section-title-3d text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16 bg-gradient-to-r ${theme === 'dark' ? 'from-white to-cyan-400' : 'from-slate-900 to-cyan-600'
                } bg-clip-text text-transparent transition-all duration-700 ${visibleElements.has('projects-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-scene">
              {projects.slice(0, visibleProjects).map((project, index) => (
                <Tilt3D key={project.title} intensity={8} className="flex">
                  <div
                    id={`project-${index}`}
                    data-animate
                    className={`card-3d relative ${cardBg} ${cardBorder} rounded-2xl overflow-hidden transition-all duration-400 group hover:shadow-2xl ${theme === 'dark' ? 'hover:shadow-pink-500/20' : 'hover:shadow-slate-300'
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
                </Tilt3D>
              ))}
            </div>

            {visibleProjects < projects.length && (
              <div className="col-span-full flex justify-center mt-10">
                <button
                  onClick={loadMoreProjects}
                  className={`btn-3d inline-flex min-w-36 text-sm overflow-hidden p-0.5 bg-gradient-to-r cursor-pointer ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-400/25`}>
                  <span className={`px-5.5 py-2 md:px-7.5 md:py-3 ${bgGradient} rounded-full flex justify-center w-full`}> <sapn className={`bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} bg-clip-text text-transparent`}>Load More</sapn></span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-19 md:py-20 ${sectionBg}`}>
          <div className="container-nw mx-auto px-3 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2
                id="contact-title"
                data-animate
                className={`section-title-3d text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r ${theme === 'dark' ? 'from-white to-cyan-400' : 'from-slate-900 to-cyan-600'
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
                <button onClick={openModal} className="btn-3d flex items-center cursor-pointer text-sm md:text-base gap-2 nd:gap-3 px-7 md:px-8 py-3 md:py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25">
                  <Mail size={20} className='-mt-0.5' />
                  Send Email
                </button>
                <a href='./assets/Anvitt_Singh_Chauhan.pdf' target='_blank' className="btn-3d flex items-center cursor-pointer text-sm md:text-base gap-2 nd:gap-3 px-7 md:px-8 py-3 md:py-4 border-2 border-pink-500 text-pink-500 font-semibold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25">
                  <FileUser size={20} className='-mt-0.5' />
                  View Resume
                </a>
                <Link href={`https://www.linkedin.com/in/anvitt-singh-chauhan-961b411bb`} target='_blank' className="btn-3d flex items-center cursor-pointer text-sm md:text-base gap-2 nd:gap-3 px-7 md:px-8 py-3 md:py-4 border-2 border-[#0a66c2] text-[#0a66c2] font-semibold rounded-full hover:bg-[#0a66c2] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#0a66c2]/25">
                  <Linkedin size={20} className='-mt-0.5' />
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer footerBorder={footerBorder} footerText={footerText} />

        {scrollY > 50 ?
          <button
            onClick={() => scrollToSection('home')}
            className={`btn-3d fixed bottom-20 md:bottom-10 right-10 transition-all ${scrollY > 120 ? 'opacity-100' : 'opacity-0'} flex justify-center items-center rounded-full text-white w-9 h-9 bg-gradient-to-r cursor-pointer shadow-lg hover:shadow-xl ${theme === 'dark' ? 'from-cyan-400 to-pink-500 shadow-cyan-500/30' : 'from-[#FF4D00] to-[#FFB326] shadow-orange-500/30'}`}>
            <ChevronUp />
          </button>
          : ''
        }

        {/* Modal */}
        <HireModal
          isModalOpen={isModalOpen}
          onCloseModal={closeModal}
          theme={theme}
          formData={formData}
          handleInputChange={handleInputChange}
          handlePhoneInputChange={handlePhoneInputChange}
          onHandleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
          openModal={openModal}
        />


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