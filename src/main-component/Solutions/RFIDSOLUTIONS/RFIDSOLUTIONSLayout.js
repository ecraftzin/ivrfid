import React, { Fragment } from 'react';
import Header from '../../../components/header/Header';
import Scrollbar from '../../../components/scrollbar/scrollbar';
import Footer from '../../../components/software-company-components/Footer/Footer';
import PageTitle from '../../../components/pagetitle/PageTitle';
import RFID_SOLUTIONS from './RFIDSOLUTIONS';


const RFID_SOLUTIONSLayout = () => {

    return (
        <Fragment>
            <div>
                <Header />
                <main className="page_content about-page">
                    <PageTitle pageTitle={'RFID SOLUTIONS'} pagesub={''} pageTop={''} />
                    <RFID_SOLUTIONS />
                </main>
                <Footer />
                <Scrollbar />
            </div>
        </Fragment>
    )
};
export default RFID_SOLUTIONSLayout;