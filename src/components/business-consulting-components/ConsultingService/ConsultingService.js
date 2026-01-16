import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HospitalityImg from '../../../images/iconssss/Hospitality.png';
import Education from '../../../images/iconssss/Education.png';
import Corporate_and_Government from '../../../images/iconssss/Corporate_and_Government.png';
import Healthcare from '../../../images/iconssss/Healthcare.png';
import Retail from '../../../images/iconssss/Retail.png';
import Residential_Projects from '../../../images/iconssss/Residential_Projects.png';
import './ConsultingService.css';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const ConsultingService = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const serviceCardsRef = useRef([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        // Animate heading
        const headingTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: headingRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        headingTimeline
            .from(headingRef.current.querySelector('.heading_focus_text'), {
                duration: 0.8,
                y: 50,
                opacity: 0,
                ease: "power3.out"
            })
            .from(headingRef.current.querySelector('h2'), {
                duration: 0.8,
                y: 50,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.4")
            .from(headingRef.current.querySelector('mark'), {
                duration: 0.6,
                scale: 0,
                opacity: 0,
                ease: "back.out(1.7)"
            }, "-=0.2");

        // Animate service cards with staggered animation
        serviceCardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    duration: 1,
                    y: 80,
                    opacity: 0,
                    rotation: index % 2 === 0 ? -3 : 3,
                    scale: 0.9,
                    ease: "power3.out",
                    delay: index * 0.1,
                    onComplete: () => {
                        // Add hover animation to icons
                        const icon = card.querySelector('.iconbox_icon img');
                        if (icon) {
                            gsap.to(icon, {
                                duration: 0.3,
                                scale: 1.1,
                                yoyo: true,
                                repeat: 1,
                                ease: "power2.inOut"
                            });
                        }
                    }
                });

                // Add hover effect to cards
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        duration: 0.3,
                        y: -10,
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(82, 39, 255, 0.15)",
                        ease: "power2.out"
                    });
                    
                    // Icon animation on hover
                    const icon = card.querySelector('.iconbox_icon img');
                    const title = card.querySelector('.iconbox_title');
                    
                    if (icon) {
                        gsap.to(icon, {
                            duration: 0.3,
                            scale: 1.15,
                            rotation: 3,
                            ease: "back.out(1.7)"
                        });
                    }
                    
                    if (title) {
                        gsap.to(title, {
                            duration: 0.3,
                            color: "#5227FF",
                            ease: "power2.out"
                        });
                    }
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        duration: 0.3,
                        y: 0,
                        scale: 1,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        ease: "power2.out"
                    });
                    
                    const icon = card.querySelector('.iconbox_icon img');
                    const title = card.querySelector('.iconbox_title');
                    
                    if (icon) {
                        gsap.to(icon, {
                            duration: 0.3,
                            scale: 1,
                            rotation: 0,
                            ease: "power2.out"
                        });
                    }
                    
                    if (title) {
                        gsap.to(title, {
                            duration: 0.3,
                            color: "#1f2937",
                            ease: "power2.out"
                        });
                    }
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section 
            ref={sectionRef}
            // className="business_consulting_service_section section_space rfid-industries-section bg-light"
            className="business_consulting_service_section section_space bg-light"
            // style={{ backgroundImage: `url(${Bg})` }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div ref={headingRef} className="heading_block text-center">
                        <div className="heading_focus_text has_underline d-inline-flex">
                            Our Industries
                        </div>
                        <h2 className="heading_text mb-0">
                            <mark>RFID Solutions</mark> For Your Industry
                        </h2>
                    </div>
                </div>

                <div className="business_consulting_services row">
                    {[
                        { 
                            img: HospitalityImg, 
                            title: "Hospitality", 
                            description: "We specialize in revolutionizing the hospitality industry through innovative RFID solutions. We offer seamless experiences for guests and unparalleled efficiency for hotel management with RFID lock management systems, Efficient Inventory Management solutions and Streamlined Event Management systems." 
                        },
                        { 
                            img: Education, 
                            title: "Education", 
                            description: "RFID and BLE based tracking are valuable technological innovation for educational institutions that want to improve campus security, streamline administrative functions and enhance academic performance." 
                        },
                        { 
                            img: Corporate_and_Government, 
                            title: "Corporate and Government", 
                            description: "In this modern era of digitalization, every Corporate and Government sector is switching to a technology-oriented approach. We offer advanced RFID solutions with a wide range of features which will improve security, enhance productivity, unparalleled efficiency and accountability." 
                        },
                        { 
                            img: Healthcare, 
                            title: "Healthcare", 
                            description: "With our advanced technology, we offer seamless integration, enhanced patient care, and optimized operational efficiency. Patient and Staff Identification, Medication Management, Patient Tracking and Workflow Optimization solutions can revolutionize your healthcare organization." 
                        },
                        { 
                            img: Retail, 
                            title: "Retail", 
                            description: "We are pioneers in transforming the retail industry through cutting-edge RFID technology. Say goodbye to manual inventory counting! Our RFID solutions automate inventory management processes, providing real-time visibility into stock levels, item locations, and movement." 
                        },
                        { 
                            img: Residential_Projects, 
                            title: "Residential Projects", 
                            description: "RFID locks bring unmatched convenience and modern security features to residential properties. Whether you're upgrading an existing property or developing a new one, these locks provide an elegant solution to meet both safety and convenience." 
                        }
                    ].map((service, index) => (
                        <div key={index} className="col-lg-4 col-md-6">
                            <div 
                                ref={el => serviceCardsRef.current[index] = el}
                                className="iconbox_block rfid-service-card equal-height-card"
                                data-index={index}
                            >
                                <div className="iconbox_icon">
                                    <img src={service.img} alt={`${service.title} - RFID Solutions`} />
                                </div>
                                <div className="iconbox_content">
                                    <h3 className="iconbox_title">
                                        {service.title}
                                    </h3>
                                    <p className="mb-0">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ConsultingService;