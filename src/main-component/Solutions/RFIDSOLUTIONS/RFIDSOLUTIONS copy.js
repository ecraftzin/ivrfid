import React from 'react';
import tImg1 from '../../../images/avatar/avatar_4.webp'
import tImg2 from '../../../images/avatar/avatar_6.webp'
import tImg3 from '../../../images/avatar/avatar_5.webp'
import tImg4 from '../../../images/avatar/avatar_7.webp'
import Bg from '../../../images/shapes/bg_pattern_2.svg'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"



const testimonial = [
    {
        id: '01',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Warehouse Management System',
        Des: "Show More",
    },
    {
        id: '02',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Asset Management & Tracking Solutions',
        Des: "Show More",
    },
    {
        id: '03',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Library Management System',
        Des: "Show More",
    },
    {
        id: '04',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Retail Management System',
        Des: "Show More",
    },
    {
        id: '05',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Jewelry Management System',
        Des: "Show More",
    },
    {
        id: '06',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Laundry Management System',
        Des: "Show More",
    },
    {
        id: '07',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Attendance Management System',
        Des: "Show More",
    },
    {
        id: '08',
        subTitle:'RFID SOLUTIONS',
        Title:'RFID Baggage Tracking System',
        Des: "Show More",
    },
    {
        id: '09',
        subTitle:'RFID SOLUTIONS',
        Title:'Customized RFID Solutions',
        Des: "Show More",
    },
]  

const RFID_SOLUTIONS = () => {

    return (

        <section className="review_section section_space bg-light" style={{ backgroundImage: `url(${Bg})` }}>
            <div className="container">
                <div className="heading_block text-center">
                    <p className="">
                        An RFID (Radio Frequency Identification) based management system is a technology solution that uses RFID tags to track and manage assets and inventory items in real-time. RFID tags are small electronic devices with unique identifiers that can communicate wirelessly with RFID readers or scanners
                    </p>

                    <p className="">
                        RFID solutions offer significant benefits in terms of efficiency, accuracy, and visibility throughout the supply chain. They empower organizations to make data-driven decisions, reduce operational costs, and enhance the overall performance of their assets and inventory management processes.
                    </p>
                </div>

                <div className="row justify-content-center">
                    <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 991: 3}}>
                        <Masonry columnsCount={4} gutter="30px">
                            {testimonial.map((testimonial, tsm) => (
                                <div className="review_block pb-0" key={tsm}>
                                    <div className="review_author">
                                        <div className="review_author_info">
                                            <h5 className="review_author_name" style={{ color: '#9b0000ff' }}>{testimonial.subTitle}</h5>
                                        </div>
                                    </div>
                                    <h3 className="review_title">{testimonial.Title}</h3>
                                    <p className="review_commtent">
                                        {testimonial.Des}
                                    </p>
                                </div>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </div>
        </section>
    );
}

export default RFID_SOLUTIONS;