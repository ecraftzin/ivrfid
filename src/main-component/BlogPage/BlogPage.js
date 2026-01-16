import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import CtaSection from '../../components/CtaSection/CtaSection';
import BlogList from '../../components/BlogList';
import Footer from '../../components/software-company-components/Footer/Footer';


const BlogPage = (props) => {

    return (
        <Fragment>
            <Header />
            <main className="page_content blog-page">
                <PageTitle pageTitle={'Our Latest Blogs'} pagesub={'Blogs'} pageTop={'Our'}/>
                <BlogList/>
            </main>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default BlogPage;
