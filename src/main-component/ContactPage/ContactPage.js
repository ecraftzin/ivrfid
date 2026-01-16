import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/software-company-components/Footer/Footer';
import ContactSection from '../../components/ContactSection';
import FloatingContact from '../FloatingContact/FloatingContact';
import ContactBg from '../../images/breadcrumbimages/dev1.jpg';

const ContactPage = (props) => {

    return (
        <Fragment>
            <Header />
            <main className="page_content about-page">
                <PageTitle pageTitle={'Contact Us'} backgroundImage={ContactBg} />
                <ContactSection />
                {/* <CtaSection /> */}
            </main>
            <Footer />
            <Scrollbar />
            <FloatingContact />
        </Fragment>
    )
};

export default ContactPage;