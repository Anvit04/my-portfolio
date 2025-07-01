import React from 'react'

const Footer = ({footerBorder, footerText}) => {
    return (
        <>
            <footer className={`py-8 ${footerBorder}`}>
                <div className={`container-nw mx-auto px-3 sm:px-6 text-center ${footerText}`}>
                    <p>&copy; 2025 Anvit Singh Chouhan. Designed & Developed with passion using Next.js.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer