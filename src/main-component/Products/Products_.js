import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

import sImg1 from '../../images/products/RFID Tags.jpg'
import sImg2 from '../../images/products/RFID UHF Hardwares.jpg'
import sImg3 from '../../images/products/RFID LOCKS.jpg'
import sImg4 from '../../images/products/Digital Locker Locks.jpg'
import sImg5 from '../../images/products/Digital Safes.jpg'
import sImg6 from '../../images/products/RFID Cards.jpg'
import sImg7 from '../../images/products/Access Control Accessories.jpg'
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/software-company-components/Footer/Footer';

const Products = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const Services = [
        {
            Id: '1',
            sImg:sImg1,
            title: 'RFID TAGS & HARDWARES',
            // slug: 'RfidTagsandHardware',
             slug: 'RFID_Tags_New',
            // thumb1:'Strategy',
            // thumb2:'Consultation',
            col:'col-lg-4',
            // description:'Visit new places to discover with a Tourist Visa. We deliver your documents ...',
        },
        {
            Id: '2',
            sImg:sImg2,
            title: 'RFID UHF Hardwares',
            // slug: 'RFID_UHF_Hardwares',
             slug: '',
            // thumb1:'Management',
            // thumb2:'Transfer',
            col:'col-lg-4',
            // description:'Developing your trade, setting up new sales channels Your visa is ready...',
        },
        {
            Id: '3',
            sImg:sImg3,
            title: 'RFID LOCKS',
            // slug: 'RFID_Locks',
             slug: '',
            // thumb1:'Landing Page',
            // thumb2:'Plugins',
            col:'col-lg-4',
            // description:'Developing your trade, setting up new sales channels Your visa is ready...',
        },
        {
            Id: '4',
            sImg:sImg4,
            title: 'Digital Locker Locks',
            // slug: 'Digital_Locker_Locks',
             slug: '',
            // thumb1:'Consultation',
            // thumb2:'solution',
            col:'col-lg-4',
            // description:'Embarking on a journey of higher education in a foreign country opens doors to...',
        },
        {
            Id: '5',
            sImg:sImg5,
            title: 'Digital Safes',
            // slug: 'Digital_Safes',
             slug: '',
            // thumb1:'Website',
            // thumb2:'Mobile App',
            col:'col-lg-4',
            // description:'Expert Guidance for a Seamless Immigration Journey Expert Guidance...',
        },
        {
            Id: '6',
            sImg:sImg6,
            title: 'RFID Cards',
            // slug: 'RFID_Cards',
             slug: '',
            // thumb1:'Website',
            // thumb2:'Mobile App',
            col:'col-lg-4',
            // description:'Expert Guidance for a Seamless Immigration Journey Expert Guidance...',
        },
        {
            Id: '7',
            sImg:sImg7,
            title: 'Access Control Accessories',
            // slug: 'Access_Control_Accessories',
             slug: '',
            // thumb1:'Website',
            // thumb2:'Mobile App',
            col:'col-lg-4',
            // description:'Expert Guidance for a Seamless Immigration Journey Expert Guidance...',
        }
    ];

    return (
        <Fragment>
            <div>
                <Header />
                <main className="page_content about-page">
                    <PageTitle pageTitle={'Products'} pagesub={''} pageTop={''} />
                    <section className="service_section section_space xb-hidden pb-0">
                        <div className="container">
                            <div className="row">
                                {Services.map((service, srv) => (
                                    <div className={`${service.col} mt-30`} key={srv}>
                                        <Link onClick={ClickHandler} to={`/products/${service.slug}`}>
                                        {service.title ?
                                            <div className="service_block">
                                                <div className="service_image" style={{height: '400px', overflow: 'hidden'}}>
                                                    <img src={service.sImg} alt="IT Management Services" />
                                                </div>
                                                <div className="service_content">
                                                    <h3 className="service_title">
                                                        {service.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            : ''}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
                <Scrollbar />
            </div>
        </Fragment>
    );
}

export default Products;