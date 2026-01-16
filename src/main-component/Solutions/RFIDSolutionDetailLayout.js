import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/software-company-components/Footer/Footer';
import PageTitle from '../../components/pagetitle/PageTitle';
import SolutionDetail from './SolutionDetail';


const RFIDSolutionDetailLayout = () => {

    return (
        <Fragment>
            <div>
                <Header />
                <main className="page_content about-page">
                    <PageTitle pageTitle={'RFID SOLUTIONS'} pagesub={''} pageTop={''} />
                    <SolutionDetail />
                </main>
                <Footer />
                <Scrollbar />
            </div>
        </Fragment>
    )
};
export default RFIDSolutionDetailLayout;