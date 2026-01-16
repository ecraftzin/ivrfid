import React from 'react';
import Services from '../../../api/service'
import { Link } from "react-router-dom";
import Bg from '../../../images/backgrounds/bg_image_3.webp'
import HospitalityImg from '../../../images/iconssss/Hospitality.png'
import Education from '../../../images/iconssss/Education.png'
import Corporate_and_Government from '../../../images/iconssss/Corporate_and_Government.png'
import Healthcare from '../../../images/iconssss/Healthcare.png'
import Retail from '../../../images/iconssss/Retail.png'
import Residential_Projects from '../../../images/iconssss/Residential_Projects.png'



const ConsultingService = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className="business_consulting_service_section section_space" style={{ backgroundImage: `url(${Bg})` }}>
            <div className="container">
                <div className="row justify-content-center">

                    <div className="heading_block text-center">
                        <div className="heading_focus_text has_underline d-inline-flex">
                            Our Industries
                        </div>
                        <h2 className="heading_text mb-0">
                            <mark>RFID Solutions</mark> For Your Industry
                        </h2>
                    </div>
                </div>

                <div className="business_consulting_services row">
                    <div className="col-lg-4">
                        <div className="iconbox_block">
                            <div className="iconbox_icon">
                                <img src={HospitalityImg} alt="Service icon" />
                            </div>
                            <div className="iconbox_content">
                                <h3 className="iconbox_title">
                                    Hospitality
                                </h3>
                                <p className="mb-0">
                                    We specialize in revolutionizing the hospitality industry through innovative RFID solutions. we offer seamless experiences for guests and unparalleled efficiency for hotel management with RFID lock management systems, Efficient Inventory Management solutions and Streamlined Event Management systems. We are committed to pushing the boundaries of innovation in the hospitality industry. Contact us today to learn more about how our RFID solutions can elevate your hotel’s guest experience.
                                </p>
                            </div>
                        </div>
                    </div>

                     <div className="col-lg-4">
                        <div className="iconbox_block">
                            <div className="iconbox_icon">
                                <img src={Education} alt="Service icon" />
                            </div>
                            <div className="iconbox_content">
                                <h3 className="iconbox_title">
                                    Education
                                </h3>
                                <p className="mb-0">
                                    RFID and BLE based tracking are valuable technological innovation for educational institutions that want to improve campus security, streamline administrative functions and enhance academic performance.Efficient Campus Access Control, Automated Attendance Tracking, Asset Tracking and Management, Library Management can optimize campus operations, enhance security, and improve the overall educational experience for students and staff.
                                </p>
                            </div>
                        </div>
                    </div>

                     <div className="col-lg-4">
                        <div className="iconbox_block">
                            <div className="iconbox_icon">
                                <img src={Corporate_and_Government} alt="Service icon" />
                            </div>
                            <div className="iconbox_content">
                                <h3 className="iconbox_title">
                                    Corporate and Government
                                </h3>
                                <p className="mb-0">
                                   In this modern era of digitalization, every Corporate and Government sector is switching to a technology-oriented approach. We are offering advanced RFID solutions with a wide range of features which will improve security, enhance productivity, unparalleled efficiency and accountability.We are committed to delivering comprehensive RFID solutions that address the unique challenges faced by government and corporate entities.
                                </p>
                            </div>
                        </div>
                    </div>

                     <div className="col-lg-4">
                        <div className="iconbox_block">
                            <div className="iconbox_icon">
                                <img src={Healthcare} alt="Service icon" />
                            </div>
                            <div className="iconbox_content">
                                <h3 className="iconbox_title">
                                    Healthcare
                                </h3>
                                <p className="mb-0">
                                    With our advanced technology, we offer seamless integration, enhanced patient care, and optimized operational efficiency. Patient and Staff Identification, Medication Management, Patient Tracking and Workflow Optimization solutions can revolutionize your healthcare organization. Our innovative RFID solutions can address the complex challenges faced by the healthcare industry and can transform your healthcare organization, improve patient outcomes, and drive operational excellence.
                                </p>
                            </div>
                        </div>
                    </div>

                     <div className="col-lg-4">
                        <div className="iconbox_block">
                            <div className="iconbox_icon">
                                <img src={Retail} alt="Service icon" />
                            </div>
                            <div className="iconbox_content">
                                <h3 className="iconbox_title">
                                    Retail
                                </h3>
                                <p className="mb-0">
                                    We are pioneers in transforming the retail industry through cutting-edge RFID technology. Say goodbye to manual inventory counting! Our RFID solutions automate inventory management processes, providing real-time visibility into stock levels, item locations, and movement. We are committed to empowering retailers with innovative RFID solutions that drive growth, efficiency, and customer satisfaction.
                                </p>
                            </div>
                        </div>
                    </div>

                     <div className="col-lg-4">
                        <div className="iconbox_block">
                            <div className="iconbox_icon">
                                <img src={Residential_Projects} alt="Service icon" />
                            </div>
                            <div className="iconbox_content">
                                <h3 className="iconbox_title">
                                    Residential Projects
                                </h3>
                                <p className="mb-0">
                                    RFID locks bring unmatched convenience and modern security features to residential properties. Whether you're upgrading an existing property or developing a new one, these locks provide an elegant solution to meet both safety and convenience. Our solutions are scalable, flexible, and tailored to enhance the living experience, while offering superior control over who accesses your property.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default ConsultingService;