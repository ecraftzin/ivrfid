import React from 'react';
import ParallaxCarousel from './ParallaxCarousel';
import bgImage1 from '../../images/home/04.jpg';
import bgImage2 from '../../images/home/banner2.jpg';

const Hero2 = () => {
    const slides = [
        {
            image: bgImage1,
            subtitle: 'IV RFID SOLUTIONS LLC',
            title: 'Next-Gen RFID Security for Smarter Access',
            description: 'Enable secure, contactless entry with intelligent RFID systems. Monitor, manage, and authorize access instantly-fast, precise, and fully automated.',
            buttonText: 'View Products',
            buttonLink: '/products',
            overlayColor: 'linear-gradient(135deg, rgba(10, 10, 40, 0.8), rgba(0, 40, 80, 0.5))'
        },
        {
            image: bgImage2,
            subtitle: 'Smart RFID',
            title: 'Seamless RFID Solutions for smarter operations',
            description: 'Track, monitor and optimize your resources in real time with precision and ease',
            buttonText: 'Explore Solutions',
            buttonLink: '/solutions',
            overlayColor: 'linear-gradient(135deg, rgba(0, 20, 60, 0.75), rgba(0, 60, 120, 0.5))'
        },
    ];

    return <ParallaxCarousel slides={slides} />;
};

export default Hero2;