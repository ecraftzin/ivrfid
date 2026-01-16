import React from 'react';
// import Services from '../../../api/service'
import { Link } from "react-router-dom";
import Bg from '../../../images/shapes/shape_title_under_line.svg'
import shape1 from '../../../images/shapes/shape_line_5.svg'
import shape2 from '../../../images/shapes/shape_line_6.svg'
import shape3 from '../../../images/shapes/shape_space_1.svg'
import shape4 from '../../../images/shapes/shape_angle_1.webp'
import shape5 from '../../../images/shapes/shape_angle_2.webp'


const Services = [
    {
        Id: '1',
        // sImg:icon1,
        title: 'On Metal RFID Tags',
        slug: '',
        features: ['Operating Frequency: Global (865-928 MHz)', 'IC type: Impinj Monza R6P or Monza M730', 'Memory: EPC 96 bits, TID 48 bits', 'Read range: up to 6 m', 'Applicable Surface Materials: All surfaces, optimized for metal']
    },
    {
        Id: '2',
        // sImg:icon2,
        title: 'Non-Metal RFID Tags',
        slug: '',
        features: ['Operating Frequency: Global (865-928 MHz)', 'IC type:NXP UCODE 8/9', 'Memory: EPC 96 bits, TID 48 bits', 'Read range: up to 10 m', 'Applicable Surface Materials: Non-metallic surfaces']
    },
    {
        Id: '3',
        // sImg:icon3,
        title: 'RFID ABS Tags',
        slug: '',
        features: ['IP67 rating', 'Operating Frequency: Global (865-928 MHz)', 'Durable outdoor resistant & high-level RF performance', 'IC type:NXP UCODE 8/ Impinj Monza', 'Memory: EPC 128 bits, TID 96 bits', 'Read range: up to 8 m', 'Applicable Surface Materials: All surface']
    },
    {
        Id: '4',
        // sImg:icon4,
        title: 'RFID Cable Tie Tags',
        slug: '',
        features: ['IP67 rating', 'Operating Frequency: Global (865-928 MHz)', 'Durable outdoor resistant & high level RF performance', 'IC type:NXP UCODE 8/ Impinj Monza', 'Memory: EPC 128 bits, TID 96 bits', 'Read Range: up to 10 m', 'Applicable Surface Materials: All surfaces']
    },
    {
        Id: '5',
        // sImg:icon5,
        title: 'RFID Windshield tags',
        slug: '',
        features: ['Operating Frequency: Global (865- 868 MHz)', 'IC type: Impinj Monza 4 QT/ Impinj M781', 'Memory: EPC 128 bits, TID 96 bits', 'Read range: up to 10 m', 'Designed to be used in automatic vehicle identification applications']
    },
    {
        Id: '6',
        // sImg:icon6,
        title: 'RFID Tire tags',
        slug: '',
        features: ['Operating Frequency: Global (865- 868 MHz)', 'IC type: Impinj Monza R6P', 'Memory: EPC 128 bits, TID 96 bits', 'Read Range: up to 10 m', 'Designed to track tires in bus groups and logistics fleet tire management.']
    },
    {
        Id: '7',
        // sImg:icon6,
        title: 'RFID Laundry Tags',
        slug: '',
        features: ['Waterproof fabric design', 'Operating Frequency: Global (865-928 MHz)', 'IC type:NXP UCODE 8', 'Memory: EPC 96 bits, TID 48 bits', 'Read range: Up to 8 m', 'Applicable for laundry management']
    },
    {
        Id: '8',
        // sImg:icon6,
        title: 'RFID Library Tags',
        slug: '',
        features: ['HF RFID Tag for Library management', 'Operating Frequency: 13.56 MHz', 'IC type: NXP ICODE SLIX I SLIX 2', 'Memory: 1024 bits/2560 bits EEPROM Read/Write', 'Read range: Up to 2 m', 'Applicable for library management']
    },
    {
        Id: '9',
        // sImg:icon6,
        title: 'Epoxy RFID /NFC Tags',
        slug: '',
        features: ['Operating Frequency: 13.56 MHz & 125Khz', 'High-quality epoxy resin, providing a durable and long-lasting', 'Can store a small amount of data, such as a URL or a unique identifier. When tapped with an NFC-enabled device, users can access the stored information for various purposes.']
    },
    {
        Id: '10',
        // sImg:icon6,
        title: 'RFID Wrist bands',
        slug: '',
        features: ['Water proof', 'Can store data essential to any RFID based systems like Access control, electronic locks and Customer loyalty programs', 'Available in all frequencies (LF, HF, UHF)']
    },
]    

const ServiceSection = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className="service_section pt-175 pb-80 bg-light section_decoration xb-hidden">
            <div className="container">
                <div className="heading_block text-center">
                    <div className="heading_focus_text has_underline d-inline-flex" style={{ backgroundImage: `url(${Bg})` }}>
                        Our Industries
                    </div>
                    <h2 className="heading_text mb-0">
                        <mark>RFID Solutions</mark> For Your Industry
                    </h2>
                    <p className="py-2">UHF RFID Tags are a type of passive RFID tag that is commonly used for asset tracking. RFID labels have a read range that can vary depending on the size of the tag and the specific RFID application, but can typically be read from several meters away. This makes them ideal for tracking assets across large areas or in complex environments.</p>
                </div>

                <div className="row">
                    {Services.map((service, srv) => (
                        <div className="col-lg-4" key={srv}>
                            <div className="service_block_2">
                                {/* <div className="service_icon">
                                    <img src={service.sImg} alt="Techco - Service icon" />
                                </div> */}
                                <h3 className="service_title">
                                    {service.title}
                                </h3>
                                <ul className="icon_list unordered_list_block">
                                    {service.features.map((feature, featureitem) => (
                                        <li key={featureitem}>
                                            <span className="icon_list_icon">
                                                <i className="fa-regular fa-circle-dot"></i>
                                            </span>
                                            <span className="icon_list_text">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div className="decoration_item shape_image_1">
                <img src={shape1} alt="Techco Shape"/>
            </div>
            <div className="decoration_item shape_image_2">
                <img src={shape2} alt="Techco Shape"/>
            </div>
            <div className="decoration_item shape_image_3">
                <img src={shape3} alt="Techco Shape"/>
            </div>
            <div className="decoration_item shape_image_4">
                <img src={shape4} alt="Techco Shape Angle"/>
            </div>
            <div className="decoration_item shape_image_5">
                <img src={shape5} alt="Techco Shape Angle"/>
            </div>
        </section>
    );
}

export default ServiceSection;