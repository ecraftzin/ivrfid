import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom'
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import CtaSection from '../../components/CtaSection/CtaSection';
import BlogSingle from '../../components/BlogDetails/BlogDetails';
import Footer from '../../components/software-company-components/Footer/Footer';


const BlogDetails = (props) => {

    return (
        <Fragment>
            <Header />
            <main className="page_content about-page">
                <PageTitle pageTitle={'Blog Details'} pagesub={'Details'} pageTop={'Blog'}/>
                <BlogSingle/>
            </main>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogDetails;