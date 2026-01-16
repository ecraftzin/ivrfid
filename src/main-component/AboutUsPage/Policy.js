import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import sIcon1 from '../../images/icons/icon_clock.svg'
import sIcon2 from '../../images/icons/icon_dart_board_2.svg'
import sIcon3 from '../../images/icons/icon_target.svg'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Policy = [
    {
        title: 'Our Vision',
        subTitle: 'Empowering businesses through seamless and intelligent RFID solutions to create a connected and secure world. Our vision is to be a leading provider delivering innovative solutions that exceed our customers expectations and contribute to their success. We aim to continuously push the boundaries of excellence, ensuring sustainable growth, unmatched quality, and exceptional services.',
        icon: sIcon3,
    },
    {
        title: 'Our Mission',
        subTitle: 'Delivering world-class, cost-effective solutions through long-term, strategic partnerships. We are committed to creating innovative solutions, fostering strong relationships, and upholding the highest standards of quality and integrity in everything we do.',
        icon: sIcon2,
    },
]

const PolicySection = (props) => {
    const sectionRef = useRef(null);
    const policyRefs = useRef([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        // Create floating elements
        const createFloatingElements = () => {
            const container = document.createElement('div');
            container.className = 'floating-elements';
            sectionRef.current.appendChild(container);

            for (let i = 0; i < 4; i++) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.style.cssText = `
                    position: absolute;
                    width: ${30 + i * 10}px;
                    height: ${30 + i * 10}px;
                    background: rgba(82, 39, 255, 0.1);
                    border: 1px solid rgba(82, 39, 255, 0.2);
                    border-radius: 50%;
                    z-index: 1;
                    pointer-events: none;
                `;
                element.style.left = `${15 + i * 20}%`;
                element.style.top = `${20 + i * 15}%`;
                container.appendChild(element);

                // Animate element
                gsap.to(element, {
                    duration: 3 + i,
                    y: `random(-30, 30)`,
                    x: `random(-30, 30)`,
                    rotation: `random(-15, 15)`,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        };

        // Animate policy cards
        policyRefs.current.forEach((card, index) => {
            if (card) {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    duration: 1,
                    y: 60,
                    opacity: 0,
                    rotation: index === 0 ? -5 : 5,
                    scale: 0.9,
                    delay: index * 0.2,
                    ease: "power3.out",
                    onComplete: () => {
                        // Icon animation
                        const icon = card.querySelector('.iconbox_icon img');
                        if (icon) {
                            gsap.to(icon, {
                                duration: 0.5,
                                scale: 1.2,
                                rotation: 360,
                                ease: "back.out(1.7)"
                            });
                        }
                    }
                });

                // Hover effects
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        duration: 0.3,
                        y: -10,
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(82, 39, 255, 0.15)",
                        ease: "power2.out"
                    });

                    const icon = card.querySelector('.iconbox_icon img');
                    const title = card.querySelector('.iconbox_title');
                    
                    if (icon) {
                        gsap.to(icon, {
                            duration: 0.3,
                            scale: 1.1,
                            rotation: 5,
                            ease: "power2.out"
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
                        boxShadow: "none",
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

        createFloatingElements();

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="policy_section bg-light">
            <div className="container">
                <div className="row d-flex align-items-stretch">
                    {Policy.map((policy, pitem) => (
                        <div className="col-lg-6 d-flex" key={pitem}>
                            <div 
                                ref={el => policyRefs.current[pitem] = el}
                                className="iconbox_block d-flex flex-column h-100 w-100 policy-card"
                            >
                                <div className="iconbox_icon">
                                    <img src={policy.icon} alt="Dollar SVG Icon" />
                                </div>
                                <div className="iconbox_content flex-grow-1">
                                    <h3 className="iconbox_title">{policy.title}</h3>
                                    <p className="mb-0">
                                        {policy.subTitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PolicySection;