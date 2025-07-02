import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react';

const HireModal = ({isModalOpen, onCloseModal, theme, formData, handleInputChange, handlePhoneInputChange, onHandleSubmit, isSubmitting, submitStatus, openModal}) => {
    return (
        <>
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/25 backdrop-blur-sm bg-opacity-50 z-60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onCloseModal}
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
                                <span className='block cursor-pointer text-sm text-gray-400' onClick={onCloseModal}><X /></span>
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
                                    onClick={onHandleSubmit}
                                    disabled={isSubmitting}
                                    className={`px-4 py-2 text-sm cursor-pointer min-w-26 max-w-26 w-[120px] bg-gradient-to-r ${theme === 'dark' ? 'from-cyan-400 to-pink-500' : 'from-[#FF4D00] to-[#FFB326]'} text-white rounded-full hover:scale-105 transition-transform`}>
                                    {isSubmitting ? 'Sending...' : 'Submit'}
                                </button>

                                <button
                                    onClick={onCloseModal}
                                    className={`px-4 py-2 text-sm cursor-pointer min-w-26 max-w-26 w-[120px] bg-gradient-to-r from-slate-300 to-slate-400 text-black rounded-full hover:scale-105 transition-transform`}>
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default HireModal