import React, { useEffect, useRef } from 'react'
import ContactForm from '../ContactFrom/ContactForm'
import icon1 from '../../images/icons/icon_map_mark_2.svg'
import icon2 from '../../images/icons/icon_calling_2.svg'
import icon3 from '../../images/icons/icon_mail_3.svg'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ContactSection = (props) => {
  const sectionRef = useRef(null)
  const infoBoxRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const mapRef = useRef(null)
  const iconBoxesRef = useRef([])

  useEffect(() => {
    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.fromTo(sectionRef.current,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Title animation
      gsap.fromTo(titleRef.current,
        { autoAlpha: 0, x: -30 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Info boxes animation (staggered)
      iconBoxesRef.current.forEach((box, index) => {
        if (box) {
          gsap.fromTo(box,
            {
              autoAlpha: 0,
              y: 40,
              scale: 0.9
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: index * 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: infoBoxRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
              }
            }
          )

          // Icon hover animation
          const icon = box.querySelector('.iconbox_icon img')
          if (icon) {
            box.addEventListener('mouseenter', () => {
              gsap.to(icon, {
                scale: 1.2,
                rotation: 360,
                duration: 0.6,
                ease: "back.out(1.7)"
              })
            })
            
            box.addEventListener('mouseleave', () => {
              gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: "power2.out"
              })
            })
          }
        }
      })

      // Form section animation
      gsap.fromTo(formRef.current,
        {
          autoAlpha: 0,
          x: -50
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Map animation
      gsap.fromTo(mapRef.current,
        {
          autoAlpha: 0,
          x: 50,
          scale: 0.95
        },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.6,
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Background wave animation
      const waveTimeline = gsap.timeline({ repeat: -1, yoyo: true })
      waveTimeline.to('.contact_section.bg-light', {
        backgroundPosition: "0% 50%",
        duration: 15,
        ease: "none"
      })
      .to('.contact_section.bg-light', {
        backgroundPosition: "100% 50%",
        duration: 15,
        ease: "none"
      })

      // Floating animation for info boxes
      iconBoxesRef.current.forEach((box, index) => {
        if (box) {
          gsap.to(box, {
            y: -10,
            duration: 2,
            delay: index * 0.1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          })
        }
      })
    })

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="contact_section section_space bg-light"
      style={{
        background: "linear-gradient(120deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)",
        backgroundSize: "400% 400%",
        overflow: "hidden"
      }}
    >
      <div className="container">
        <div ref={infoBoxRef} className="contact_info_box row">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div 
              ref={el => iconBoxesRef.current[0] = el}
              className="iconbox_block text-center"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              <div className="iconbox_icon">
                <img 
                  src={icon1} 
                  alt="Map Mark SVG Icon"
                  style={{
                    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                    transition: "all 0.3s ease"
                  }}
                />
              </div>
              <div className="iconbox_content">
                <h3 className="iconbox_title">Location</h3>
                <p className="mb-0">
                  Office# 607, Al Saoud building, AI Qusais 4, Dubai, UAE
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div 
              ref={el => iconBoxesRef.current[1] = el}
              className="iconbox_block text-center"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              <div className="iconbox_icon">
                <img 
                  src={icon2} 
                  alt="Calling SVG Icon" 
                  style={{
                    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                    transition: "all 0.3s ease"
                  }}
                />
              </div>
              <div className="iconbox_content">
                <h3 className="iconbox_title">Contact</h3>
                <p className="mb-0">+971 42696279</p>
                <div className="mb-0">+971 58 285 2600</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div 
              ref={el => iconBoxesRef.current[2] = el}
              className="iconbox_block text-center"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              <div className="iconbox_icon">
                <img 
                  src={icon3} 
                  alt="User Check SVG Icon" 
                  style={{
                    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                    transition: "all 0.3s ease"
                  }}
                />
              </div>
              <div className="iconbox_content">
                <h3 className="iconbox_title">Email</h3>
                <p className="mb-0">sales@iv-rfid.com</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="section_space pb-0">
          <div className="row justify-content-lg-between align-items-stretch">
            <div ref={formRef} className="col-lg-7">
              <div className="contact_form mb-0 h-100">
                <div 
                  className="h-100"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    transform: "translate3d(0,0,0)",
                    padding: "2rem",
                    backgroundColor: "#fff"
                  }}
                >
                  <h3 
                    ref={titleRef}
                    className="details_item_info_title mb-1"
                    style={{ transform: "translate3d(0,0,0)" }}
                  >
                    Contact Us
                  </h3>
                  {/* <p className="mb-5">
                    Give us chance to serve and bring magic to your brand.
                  </p> */}
                  <div className="d-flex flex-column" style={{ height: "calc(100% - 100px)" }}>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
            <div ref={mapRef} className="col-lg-5">
              <div 
                className="h-100"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  transform: "translate3d(0,0,0)"
                }}
              >
                <iframe 
                  title='map' 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.5513478611123!2d55.39424531500009!3d25.291504215585488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d331896f22f%3A0xc8c888b309cd2161!2sIV%20RFID%20Solutions%20LLC!5e0!3m2!1sen!2sus!4v1704495678901!5m2!1sen!2sus"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    filter: "grayscale(20%) contrast(1.1)"
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection;