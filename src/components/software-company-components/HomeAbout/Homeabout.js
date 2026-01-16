import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import about1 from '../../../images/home/home.png'
import '../../../../node_modules/react-modal-video/scss/modal-video.scss';
import "./HomeAbout.css"

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Homeabout = (props) => {
    const [isOpen, setOpen] = useState(false)
    const [yearsExperience, setYearsExperience] = useState(0)
    const sectionRef = useRef(null)
    const imageRef = useRef(null)
    const contentRef = useRef(null)
    const experienceRef = useRef(null)
    const statsRefs = useRef([])

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    useEffect(() => {
        // Animate experience counter
        const countExperience = () => {
            let count = 0
            const target = 15
            const duration = 2000 // 2 seconds
            const increment = target / (duration / 16) // 60fps
            
            const timer = setInterval(() => {
                count += increment
                if (count >= target) {
                    count = target
                    clearInterval(timer)
                }
                setYearsExperience(Math.floor(count))
            }, 16)
        }

        // Create floating elements
        const createFloatingElements = () => {
            const elementsContainer = document.createElement('div')
            elementsContainer.className = 'floating-elements-container'
            sectionRef.current.appendChild(elementsContainer)

            // Create RFID tags
            for (let i = 0; i < 5; i++) {
                const tag = document.createElement('div')
                tag.className = `floating-rfid-tag tag-${i + 1}`
                elementsContainer.appendChild(tag)

                // Animate each tag
                gsap.to(tag, {
                    duration: 3 + i * 0.5,
                    x: `random(-50, 50)`,
                    y: `random(-30, 30)`,
                    rotation: `random(-15, 15)`,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                })
            }
        }

        // Main animation timeline
        const mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        })

        // Image animation
        mainTimeline.from(imageRef.current, {
            duration: 1,
            x: -100,
            opacity: 0,
            scale: 0.9,
            ease: "power3.out"
        })

        // Content animation
        mainTimeline.from(contentRef.current.children, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.5")

        // Stats animation
        mainTimeline.from(experienceRef.current, {
            duration: 0.8,
            scale: 0,
            opacity: 0,
            ease: "back.out(1.7)"
        }, "-=0.3")

        // Stats counter animation
        mainTimeline.add(countExperience, "-=0.2")

        // Animate stats items
        statsRefs.current.forEach((stat, index) => {
            if (stat) {
                gsap.from(stat, {
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    },
                    duration: 1,
                    y: 30,
                    opacity: 0,
                    delay: index * 0.1,
                    ease: "power3.out"
                })

                // Add hover effect
                stat.addEventListener('mouseenter', () => {
                    gsap.to(stat, {
                        duration: 0.3,
                        scale: 1.05,
                        y: -5,
                        boxShadow: "0 10px 25px rgba(82, 39, 255, 0.2)",
                        ease: "power2.out"
                    })
                })

                stat.addEventListener('mouseleave', () => {
                    gsap.to(stat, {
                        duration: 0.3,
                        scale: 1,
                        y: 0,
                        boxShadow: "none",
                        ease: "power2.out"
                    })
                })
            }
        })

        // Create floating elements
        createFloatingElements()

        // Animate background waves
        const waves = document.querySelectorAll('.rfid-wave')
        waves.forEach((wave, index) => {
            gsap.to(wave, {
                duration: 2 + index * 0.5,
                scale: 1.2,
                opacity: 0,
                repeat: -1,
                delay: index * 0.3,
                ease: "power1.out"
            })
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <section className="about_section section_space rfid-about-section" ref={sectionRef}>

            <div className="container">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6">
                        <div className="about_image_1 rfid-image-wrapper" ref={imageRef}>
                            <div className="image-container">
                                <img src={about1} alt="RFID Solutions - IV RFID Solutions LLC" />
                                <div className="image-glow"></div>
                            </div>
                            {/* Experience Badge */}
                            <div className="experience-badge" ref={experienceRef}>
                                <div className="experience-number">
                                    {yearsExperience}<span className="plus">+</span>
                                </div>
                                <div className="experience-text">Years Experience</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about_content" ref={contentRef}>
                            <div className="heading_block">
                                <div className="section-label">
                                    <span className="label-text">About Company</span>
                                    <span className="label-line"></span>
                                </div>
                                <h2 className="heading_text">
                                    Revolutionizing Industries with <span className="rfid-text">RFID Solutions</span>
                                </h2>
                                <p className="heading_description mb-0">
                                    IV RFID Solutions LLC, an ISO9001 Certified Company for quality management, is a leading provider of RFID-based solutions, BLE solutions, Electronic locking systems and access control solutions. We offer a wide range of products and services designed to meet the highest security standards.
                                </p>
                                <p className="heading_description mb-4">
                                    As a trusted leader in the field, we are dedicated to maintaining the highest standards of excellence in everything we do. Our cutting-edge technology ensures the utmost safety, efficiency, and convenience for our clients.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Homeabout