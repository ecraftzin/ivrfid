import React, { Fragment, useState } from 'react';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/software-company-components/Footer/Footer';
import PolicySection from './Policy';
import WhyUs from './WhyUs';
import FloatingContact from '../FloatingContact/FloatingContact';
import AboutBg from '../../images/breadcrumbimages/dev.jpg';

const AboutUsPage = (props) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <Fragment>
            <Header />
            <main className="page_content about-page">
                <PageTitle pageTitle={'About Us'} backgroundImage={AboutBg} />
                <section className="intro_about_section section_space bg-light">
                    <div className="container">
                        <div className="heading_block mb-0">
                            <div className="row justify-content-lg-between">
                                <div className="">
                                    <p className="heading_description mb-0">
                                        IV RFID Solutions, we are at the forefront of revolutionizing industries through cutting-edge RFID technology. With a commitment to innovation and excellence, we specialize in providing comprehensive RFID solutions that empower businesses to enhance efficiency, security, and connectivity. We specialize in providing the most innovative, reliable, and latest technologies in RFID-based security systems. Our objective is to provide quality solutions and execution works for our clients in a cost-effective manner, which best serves individual needs and requirements. We bring together a team of seasoned professionals with deep expertise in RFID technology and access control systems. Leveraging years of industry experience and a passion for delivering exceptional solutions, we pride ourselves on being at the forefront of security innovation.
                                    </p>
                                    <p className="heading_description mt-5">
                                        IV RFID, an ISO9001 Certified Company for quality management are dedicated to maintaining the highest standards of excellence in ever thing we do. This commitment is reflected in our ISO certification, a recognition that signifies our adherence to internationally recognized quality management and operational excellence standards.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <PolicySection />
                <WhyUs />
            </main>
            <Footer />
            <Scrollbar />
            <FloatingContact />
        </Fragment>
    );
};
export default AboutUsPage;