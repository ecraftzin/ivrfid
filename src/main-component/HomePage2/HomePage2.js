import React, { Fragment, lazy, Suspense } from 'react';
import Header from '../../components/header/Header';
import AutoBanner from '../../components/hero2/AutoBanner';
import About from '../../components/software-company-components/about/about';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/software-company-components/Footer/Footer';
import ConsultingService from '../../components/business-consulting-components/ConsultingService/ConsultingService';
import Homeabout from '../../components/software-company-components/HomeAbout/Homeabout';
import PartnerSection from '../../components/business-consulting-components/PartnerSection/PartnerSection';
import FloatingContact from '../FloatingContact/FloatingContact';

const Hero2 = lazy(() => import('../../components/hero2/hero2'));


const HomePage2 = () => {

    return (
        <Fragment>
            <div>
                <Header />
                <main className="page_content">
                    {/* Toggle between AutoBanner (default) and Hero2 (lazy) */}
                    <AutoBanner />
                    {/* To use the original Hero2 component instead, change the line above to:
                        <Suspense fallback={<div/>}><Hero2 /></Suspense>
                    */}
                    <Homeabout />
                    <PartnerSection/>
                    <ConsultingService/>
                    <About />
                </main>
                <Footer />
                <Scrollbar />
                <FloatingContact />
            </div>
        </Fragment>
    )
};
export default HomePage2;