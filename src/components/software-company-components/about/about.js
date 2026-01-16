import React from 'react';
import Bg from '../../../images/backgrounds/bg_image_2.webp'
import Bg3 from '../../../images/shapes/shape_title_under_line.svg'
import shape1 from '../../../images/shapes/shape_space_2.svg'
import img1 from '../../../images/whychooseus/img1.jpg'
import img2 from '../../../images/whychooseus/img2.jpg'
import img3 from '../../../images/whychooseus/img3.jpg'


const About = (props) => {

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }

  return (
    <section className="about_and_case_section section_space section_decoration bg-dark" style={{ backgroundImage: `url(${Bg})` }}>
      <div className="container">

        <div className="">
          <div className="heading_block text-center text-white">
            <div className="heading_focus_text has_underline d-inline-flex" style={{ backgroundImage: `url(${Bg3})` }}>
              WHY CHOOSE US
            </div>
            <h2 className="heading_text mb-0">
              We Offer Best Features For <mark>RFID Solutions</mark>
            </h2>
          </div>

          <div className="case_studies_wrapper">
              <div className="case_study_block">
                <div className="case_study_image">
                  <img src={img1} alt="Techco - Cases" />
                </div>
                <div className="case_study_content">
                  <ul className="category_list unordered_list text-uppercase">
                    {/* <li><a href="portfolio.html">sdfsdafe</a></li> */}
                  </ul>
                  <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold mb-3 shadow" 
                      style={{width: '40px', height: '40px', fontSize: '18px', backgroundColor: '#020842'}}>
                    1
                  </div>
                  <h3 className="case_title">
                    Expertise
                  </h3>
                  <p>
                    With years of experience in the industry, our team of seasoned professionals brings unparalleled expertise and knowledge to every project
                  </p>
                </div>
              </div>


              <div className="case_study_block">
                <div className="case_study_image">
                  <img src={img2} alt="Techco - Cases" />
                </div>
                <div className="case_study_content">
                  <ul className="category_list unordered_list text-uppercase">
                    {/* <li><a href="portfolio.html">sdfsdafe</a></li> */}
                  </ul>
                  <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold mb-3 shadow" 
                      style={{width: '40px', height: '40px', fontSize: '18px', backgroundColor: '#020842'}}>
                    2
                  </div>
                  <h3 className="case_title">
                    Innovation
                  </h3>
                  <p>
                    We’re constantly pushing the boundaries of what’s possible in the world of RFID and access control systems
                  </p>
                </div>
              </div>


              <div className="case_study_block">
                <div className="case_study_image">
                  <img src={img3} alt="..." />
                </div>
                <div className="case_study_content">
                  <ul className="category_list unordered_list text-uppercase">
                    {/* <li><a href="portfolio.html">sdfsdafe</a></li> */}
                  </ul>
                  <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold mb-3 shadow"
                      style={{width: '40px', height: '40px', fontSize: '18px', backgroundColor: '#020842'}}>
                    3
                  </div>
                  <h3 className="case_title">
                    Customer Service
                  </h3>
                  <p>
                    At IV-RFID, we believe that exceptional customer service is the key to success
                  </p>
                </div>
              </div>
          </div>

        </div>
      </div>
      <div className="decoration_item shape_image_1">
        <img src={shape1} alt="Techco Shape" />
      </div>
    </section>
  )
}

export default About;