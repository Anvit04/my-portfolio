"use client";

import React, { useState, useEffect } from 'react';
import { Mail, ExternalLink, Github, Linkedin, Menu, X, Sun, Moon } from 'lucide-react';
import { skills, projects } from "../constants/data";
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'

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
  }, []);

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

  return (
    <>
      <div className={`min-h-screen ${bgGradient} ${textColor} overflow-x-hidden`}>
        {/* Header */}
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrollY > 10 ? headerScrollBg : headerBg
          }`}>
          <nav className="container-nw mx-auto px-0 py-4 flex justify-between items-center">
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
          {isMenuOpen && (
            <div className={`md:hidden ${theme === 'dark' ? 'bg-slate-900/95 backdrop-blur-xl' : 'bg-white/95 backdrop-blur-xl'} border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
              <ul className="py-4 px-6 space-y-4">
                {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block w-full text-left hover:text-cyan-400 transition-colors duration-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
        <section id="home" className="min-h-screen flex items-center justify-center px-6 relative">
          <div className="container-nw mx-auto text-center z-10">
            <div className="animate-fade-in-up">
              <div className='flex justify-between'>
                <div className='text-left'>
                  <h1 className={`text-5xl md:text-7xl font-extrabold inline-block mb-6 bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} bg-clip-text text-transparent`}>
                    {/* Anvit Singh Chouhan */}
                    Test
                  </h1>
                  <p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${secondaryTextColor} leading-relaxed`}>
                    Crafting exceptional digital experiences with 3+ years of expertise in modern web technologies.
                    From responsive designs to full-stack applications, I bring ideas to life with pixel-perfect precision.
                  </p>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className={`inline-block px-8 py-4 bg-gradient-to-r cursor-pointer ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-400/25`}>
                    View My Work
                  </button>
                </div>

                <div className='w-full max-w-100'>
                  <img className='w-full max-w-80 mx-auto' src='./assets/img/image-dummy.svg' />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-20 ${sectionBg}`}>
          <div className="container-nw mx-auto px-6">
            <h2
              id="skills-title"
              data-animate
              className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r ${theme === 'dark' ? 'from-white to-cyan-400' : 'from-slate-900 to-cyan-600'
                } bg-clip-text text-transparent transition-all duration-700 ${visibleElements.has('skills-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Technical Expertise
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <div
                  key={skill.title}
                  id={`skill-${index}`}
                  data-animate
                  className={`${cardBg} ${cardBorder} p-8 rounded-2xl hover:scale-105 transition-all duration-400 cursor-pointer group hover:shadow-2xl ${theme === 'dark' ? 'hover:shadow-cyan-400/20' : 'hover:shadow-slate-300'
                    } ${visibleElements.has(`skill-${index}`)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                    } ${hoverCard}`}
                  // style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`text-4xl mb-4 w-16 h-16 bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-4  ${theme === 'dark' ? 'group-hover:text-cyan-400' : 'group-hover:text-[#FF4D00] '} transition-colors duration-400`}>
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
        <section id="projects" className="py-20">
          <div className="container-nw mx-auto px-6">
            <h2
              id="projects-title"
              data-animate
              className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r ${theme === 'dark' ? 'from-white to-cyan-400' : 'from-slate-900 to-cyan-600'
                } bg-clip-text text-transparent transition-all duration-700 ${visibleElements.has('projects-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  id={`project-${index}`}
                  data-animate
                  className={`${cardBg} ${cardBorder} rounded-2xl overflow-hidden hover:scale-103 transition-all duration-400 group hover:shadow-2xl ${theme === 'dark' ? 'hover:shadow-pink-500/20' : 'hover:shadow-slate-300'
                    } ${visibleElements.has(`project-${index}`)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                    }`}
                // style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`h-48 ${cardBorder} border-b border-t-0 border-l-0 border-r-0 overflow-hidden`}>
                    <div className={` h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-400`}
                      style={{ backgroundImage: `url(${project.proImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      {/* {project.emoji} */}
                    </div>
                  </div>
                  {/* <img src={project.proImage}/> */}
                  <div className="p-8">
                    <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'group-hover:text-cyan-400 ' : 'group-hover:text-[#FF4D00]'} transition-colors duration-400`}>
                      {project.title}
                    </h3>
                    <p className={`${secondaryTextColor} mb-6 leading-relaxed line-clamp-3 max-w-[100%] overflow-hidden text-ellipsis`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 ${theme === 'dark' ? 'border-cyan-400/30 bg-cyan-400/20 text-cyan-400' : 'text-[#FF4D00] bg-[#FF4D00]/20 border-[#FF4D00]/30'} rounded-full text-sm border `}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link href={project.proLink} target='_blank' className={`font-semibold ${theme === 'dark' ? 'text-cyan-400 hover:text-pink-500' : 'text-[#FF4D00] '} transition-colors duration-400 inline-flex items-center gap-2`}>
                      View Project <ExternalLink size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-20 ${sectionBg}`}>
          <div className="container-nw mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2
                id="contact-title"
                data-animate
                className={`text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r ${theme === 'dark' ? 'from-white to-cyan-400' : 'from-slate-900 to-cyan-600'
                  } bg-clip-text text-transparent transition-all duration-700 ${visibleElements.has('contact-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
              >
                Let's Create Something Amazing
              </h2>
              <p
                id="contact-description"
                data-animate
                className={`text-lg md:text-xl mb-12 ${secondaryTextColor} leading-relaxed transition-all duration-700 ${visibleElements.has('contact-description') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: '200ms' }}
              >
                Ready to bring your vision to life? I'm always excited to work on new projects and collaborate with innovative teams.
              </p>

              <div
                id="contact-buttons"
                data-animate
                className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-700 ${visibleElements.has('contact-buttons') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: '400ms' }}
              >
                <button className="flex items-center gap-3 px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25">
                  <Mail size={20} />
                  Send Email
                </button>
                <button className="flex items-center gap-3 px-8 py-4 border-2 border-pink-500 text-pink-500 font-semibold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/25">
                  <Github size={20} />
                  View Resume
                </button>
                <button className="flex items-center gap-3 px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-400/25">
                  <Linkedin size={20} />
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-8 ${footerBorder}`}>
          <div className={`container-nw mx-auto px-6 text-center ${footerText}`}>
            <p>&copy; 2025 Anvit singh chouhan. Designed & Developed with passion using Next.js.</p>
          </div>
        </footer>

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
