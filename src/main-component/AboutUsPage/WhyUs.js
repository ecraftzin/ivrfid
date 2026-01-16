import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import sIcon1 from '../../images/icons/icon_check_2.svg'
import sIcon2 from '../../images/icons/icon_leaf.svg'
import sIcon3 from '../../images/icons/icon_box.svg'
import sIcon4 from '../../images/icons/icon_receipt_add.svg'
import sIcon5 from '../../images/icons/icon_monitor.svg'
import sIcon6 from '../../images/icons/icon_microscope.svg'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Policy = [
    {
        title: 'Innovative solutions',
        icon: sIcon1,
        para: 'We leverage the latest RFID technology to provide smart and scalable solutions.',
        para1: 'From consultation and system design to deployment and support, we provide complete RFID solutions under one roof.',
        para2: 'At IV RFID, we don’t just provide RFID technology—we deliver intelligent solutions that empower businesses to operate smarter, faster, and more efficiently.'
    },
    {
        title: 'Cutting-Edge Technology',
        icon: sIcon2,
        para: 'Our solutions are powered by cutting-edge technology designed to deliver accuracy, speed, efficiency and reliability',
        para1: 'We design our solutions with scalability in mind. Our modular architecture supports expansion, IoT integration, automation, and future technology upgrades—ensuring long-term value and adaptability as business needs evolve.',
        para2: ''
    },
    {
        title: 'Reliable Performance',
        icon: sIcon3,
        para: 'Reliability is built into every solution we deliver. Our systems are engineered to perform consistently and accurately in real-world environments.',
        para1: 'Robust system architecture and proactive monitoring help reduce downtime and maintain smooth, uninterrupted workflows.',
        para2: 'We design and deploy solutions using proven hardware, optimized configurations, and rigorous testing to ensure stable performance.'
    },
    {
        title: 'Seamless Integration',
        icon: sIcon4,
        para: 'Our solutions are designed for seamless integration with your existing systems and workflows.',
        para1: 'This flexibility ensures compatibility with both legacy systems and modern platforms, reducing implementation complexity and accelerating deployment.',
        para2: 'With a focus on compatibility, efficiency, and long-term adaptability, we deliver solutions that integrate seamlessly and work in harmony with your existing technology ecosystem.'
    },
    {
        title: 'Enhanced Security',
        icon: sIcon5,
        para: 'We prioritize data security and protection, giving you peace of mind.',
        para1: 'Our systems are built to protect assets, data, and operations by combining advanced RFID technology with robust security controls and best practices.',
        para2: 'We ensure data accuracy and integrity through secure communication protocols and validation processes.'
    },
    {
        title: 'Customer-Centric Approach',
        icon: sIcon6,
        para: 'Our focus is on delivering value and exceptional service to our customers.',
        para1: 'We believe that every solution should be tailored to meet the unique challenges and goals of each organization, delivering measurable value and long-term results.',
        para2: 'We provide continuous training, technical support, and system monitoring to ensure optimal performance.'
    },
]

const WhyUs = (props) => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        // Heading animation
        const headingTl = gsap.timeline({
            scrollTrigger: {
                trigger: headingRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        headingTl
            .from(headingRef.current.querySelector('.heading_focus_text'), {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: "power3.out"
            })
            .from(headingRef.current.querySelector('h2'), {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.4")
            .from(headingRef.current.querySelector('mark'), {
                duration: 0.6,
                scale: 0,
                opacity: 0,
                ease: "back.out(1.7)"
            }, "-=0.2");

        // Items animation
        itemRefs.current.forEach((item, index) => {
            if (item) {
                // Create connector line
                const line = document.createElement('div');
                line.className = 'connector-line';
                line.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 40px;
                    width: 30px;
                    height: 2px;
                    background: linear-gradient(90deg, #5227FF, #8B5CF6);
                    transform-origin: left center;
                    transform: scaleX(0);
                    z-index: 1;
                    pointer-events: none;
                `;
                item.appendChild(line);

                // Animate item entrance
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    duration: 0.8,
                    x: -50,
                    opacity: 0,
                    delay: index * 0.1,
                    ease: "power3.out",
                    onComplete: () => {
                        // Animate connector line
                        gsap.to(line, {
                            duration: 0.5,
                            scaleX: 1,
                            ease: "power2.out"
                        });

                        // Animate icon
                        const icon = item.querySelector('.iconbox_icon img');
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
                item.addEventListener('mouseenter', () => {
                    gsap.to(item, {
                        duration: 0.3,
                        x: 10,
                        backgroundColor: "rgba(82, 39, 255, 0.05)",
                        ease: "power2.out"
                    });

                    const icon = item.querySelector('.iconbox_icon img');
                    const title = item.querySelector('.iconbox_title');
                    
                    if (icon) {
                        gsap.to(icon, {
                            duration: 0.3,
                            scale: 1.3,
                            rotation: 10,
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

                    // Line animation
                    gsap.to(line, {
                        duration: 0.3,
                        width: "50px",
                        backgroundColor: "#5227FF",
                        ease: "power2.out"
                    });
                });

                item.addEventListener('mouseleave', () => {
                    gsap.to(item, {
                        duration: 0.3,
                        x: 0,
                        backgroundColor: "transparent",
                        ease: "power2.out"
                    });

                    const icon = item.querySelector('.iconbox_icon img');
                    const title = item.querySelector('.iconbox_title');
                    
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

                    // Reset line
                    gsap.to(line, {
                        duration: 0.3,
                        width: "30px",
                        backgroundColor: "linear-gradient(90deg, #5227FF, #8B5CF6)",
                        ease: "power2.out"
                    });
                });
            }
        });

        // Create RFID signal animation
        const createSignalAnimation = () => {
            const container = document.createElement('div');
            container.className = 'rfid-signals';
            sectionRef.current.appendChild(container);

            for (let i = 0; i < 3; i++) {
                const signal = document.createElement('div');
                signal.className = 'rfid-signal';
                signal.style.cssText = `
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    border: 2px solid rgba(82, 39, 255, 0.${2 - i});
                    border-radius: 50%;
                    z-index: 1;
                    pointer-events: none;
                `;
                signal.style.left = `${20 + i * 10}%`;
                signal.style.top = `${60 + i * 5}%`;
                container.appendChild(signal);

                gsap.to(signal, {
                    duration: 2 + i,
                    scale: 1.5,
                    opacity: 0,
                    repeat: -1,
                    delay: i * 0.5,
                    ease: "power1.out"
                });
            }
        };

        createSignalAnimation();

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="service_section section_space bg-light">
            <div className="container">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-12">
                        <div className="ps-lg-5">
                            <div ref={headingRef} className="heading_block text-center">
                                <div className="heading_focus_text has_underline d-inline-flex">
                                    Why Iv Rfid Solutions
                                </div>
                                <h2 className="heading_text mb-0">
                                    <mark>What Sets</mark> Us Apart
                                </h2>
                            </div>
                            
                            <ul className="service_facilities_group unordered_list">
                                {Policy.map((policy, pitem) => (
                                    <li key={pitem} ref={el => itemRefs.current[pitem] = el}>
                                        <div className="iconbox_block layout_icon_left why-us-item" style={{ height: 'auto', minHeight: '300px' }}>
                                            <span className="iconbox_icon">
                                                <img src={policy.icon} alt="Dollar SVG Icon" />
                                            </span>
                                            <div className="iconbox_content d-flex flex-column">
                                                <span className="iconbox_content">
                                                    <strong className="iconbox_title mb-0">{policy.title}</strong>
                                                </span>
                                                <p className="iconbox_text text-muted">{policy.para}<br />{policy.para1}<br />{policy.para2}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyUs;