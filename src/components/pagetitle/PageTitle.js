import React from 'react'
import Bg from '../../images/breadcrumb.png'


const PageTitle = ({ pageTop, pagesub, pageTitle, backgroundImage }) => {
    const bg = backgroundImage || Bg;
    return (
        <section className="page_banner_section text-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${bg})` }}>
            <div className="container">
                <div className="heading_focus_text text-white">
                    {pageTop}
                    <span className="badge bg-secondary">{pagesub}</span>
                </div>
                <h1 className="page_title mb-0 text-white">{pageTitle}</h1>
            </div>
        </section>
    )
}

export default PageTitle;