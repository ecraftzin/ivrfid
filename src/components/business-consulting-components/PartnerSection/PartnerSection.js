import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pimg1 from '../../../images/our clients/img1.png'
import pimg2 from '../../../images/our clients/img2.png'
import pimg3 from '../../../images/our clients/img3.png'
import pimg4 from '../../../images/our clients/img4.png'
import pimg5 from '../../../images/our clients/img5.png'
import pimg6 from '../../../images/our clients/img6.png'
import pimg7 from '../../../images/our clients/img7.png'
import pimg8 from '../../../images/our clients/img8.png'
import pimg9 from '../../../images/our clients/img9.png'
import pimg10 from '../../../images/our clients/img10.png'
import pimg11 from '../../../images/our clients/img11.png'
import pimg12 from '../../../images/our clients/img12.png'
import pimg13 from '../../../images/our clients/img13.png'
import pimg14 from '../../../images/our clients/img14.png'
import pimg15 from '../../../images/our clients/img15.png'
import pimg16 from '../../../images/our clients/img16.png'
import pimg17 from '../../../images/our clients/img17.jfif'
import pimg18 from '../../../images/our clients/img18.png'
import pimg19 from '../../../images/our clients/img19.png'
import pimg20 from '../../../images/our clients/img20.png'
import pimg21 from '../../../images/our clients/img21.png'
import pimg22 from '../../../images/our clients/img22.png'
import pimg23 from '../../../images/our clients/img23.png'
import pimg24 from '../../../images/our clients/img24.png'
import pimg25 from '../../../images/our clients/img25.png'
import pimg26 from '../../../images/our clients/img27.png'
import pimg27 from '../../../images/our clients/img28.png'
import pimg28 from '../../../images/our clients/img29.jpg'
import pimg29 from '../../../images/our clients/img30.jpg'
import pimg30 from '../../../images/our clients/img31.png'
import pimg31 from '../../../images/our clients/img32.png'
import pimg32 from '../../../images/our clients/img33.png'
import pimg33 from '../../../images/our clients/img34.png'
import pimg34 from '../../../images/our clients/img35.png'
import pimg35 from '../../../images/our clients/img36.png'
import pimg36 from '../../../images/our clients/img37.png'
import pimg37 from '../../../images/our clients/img38.png'
import pimg38 from '../../../images/our clients/img39.png'
import pimg39 from '../../../images/our clients/img40.png'

const partners = [
    {
        pImg: pimg1,
    },
    {
        pImg: pimg2,
    },
    {
        pImg: pimg3,
    },
    {
        pImg: pimg4,
    },
    {
        pImg: pimg5,
    },
    {
        pImg: pimg6,
    },
    {
        pImg: pimg7,
    },
    {
        pImg: pimg8,
    },
    {
        pImg: pimg9,
    },
    {
        pImg: pimg10,
    },
    {
        pImg: pimg11,
    },
    {
        pImg: pimg12,
    },
    {
        pImg: pimg13,
    },
    {
        pImg: pimg14,
    },
    {
         pImg: pimg15,
    },
    {
        pImg: pimg16,
    },
    {
        pImg: pimg17,
    },
    {
        pImg: pimg18,
    },
    {
        pImg: pimg19,
    },
    {
        pImg: pimg20,
    },
    {
        pImg: pimg21,
    },
    {
        pImg: pimg22,
    },
    {
        pImg: pimg23,
    },
    {
        pImg: pimg24,
    },
    {
        pImg: pimg25,
    },
    {
        pImg: pimg26,
    },
    {
        pImg: pimg27,
    },
    {
        pImg: pimg28,
    },
    {
        pImg: pimg29,
    },
    {
        pImg: pimg30,
    },
    {
        pImg: pimg31,
    },
    {
        pImg: pimg32,
    },
    {
        pImg: pimg33,
    },
    {
        pImg: pimg34,
    },
    {
        pImg: pimg35,
    },
    {
        pImg: pimg36,
    },
    {
        pImg: pimg37,
    },
    {
        pImg: pimg38,
    },
    {
        pImg: pimg39,
    }
]

var settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,

    responsive: [
        {
            breakpoint: 1025,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 450,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 350,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};



const PartnerSection = (props) => {

    return (
        <section className="client_logo_section section_space bg-transparent mb-0">
            <div className="container">
                <div className="heading_block text-center">
                    <h2 className="heading_text mb-0">
                        "Our Clients"
                    </h2>
                </div>
                <div className="client_logo_carousel swiper no_style">
                    <Slider {...settings}>
                        {partners.map((partner, pitem) => (
                            <div className="client_logo_item" key={pitem}>
                                <img src={partner.pImg} alt="Techco - Client Logo" />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default PartnerSection;