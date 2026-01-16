import React from 'react';

// Import images
import onMetalImg from '../../../content_for_web/website content/website content/pics/RFID Tags/rfid on metal tags.png';
import nonMetalImg from '../../../content_for_web/website content/website content/pics/RFID Tags/rfid non metal tags.jpg';
import absTagsImg from '../../../content_for_web/website content/website content/pics/RFID Tags/rfid abs tags.jpg';
import cableTieImg from '../../../content_for_web/website content/website content/pics/RFID Tags/RFID-Cable tie tags.jpg';
import laundryImg from '../../../content_for_web/website content/website content/pics/RFID Tags/rfid-laundry-tags.jpg';
import windshieldImg from '../../../content_for_web/website content/website content/pics/RFID Tags/rfid windsheild tags.jpg';
import jewelryImg from '../../../content_for_web/website content/website content/pics/RFID Tags/rfid jewllery tags.jpg';
import libraryImg from '../../../content_for_web/website content/website content/pics/RFID Tags/rfid library tags.jpg';
import tyreImg from '../../../content_for_web/website content/website content/pics/RFID Tags/rfid tyre tags.jpg';

const rfidTagsData = [
    {
        id: '1',
        title: 'RFID ON METAL TAGS',
        image: onMetalImg,
        description1: 'On metal flexible label can be stuck on metallic assets easily, especially for irregular and uneven surfaces. It has good performance on the metal surface, and can be printed and encoded by an RFID printer.',
        description2: 'They offer an extended reading range, making them competent for disparate application ranges.',
        features: [
            'Operating Frequency: Global (865-928 MHz)',
            'Interface Protocol: ISO 18000-63 and EPC global Gen2v2',
            'Material: PET / Synthetic Polyester',
            'IC type: Impinj Monza R6P or Monza M730',
            'Memory: EPC 96 bits, TID 48 bits',
            'Read range: up to 6 m',
            'IP68 rated',
            'Write Cycle Endurance: 100,000 cycles'
        ]
    },
    {
        id: '2',
        title: 'NON-METAL RFID TAGS',
        image: nonMetalImg,
        description1: 'Non-metal RFID tags are specially designed for use in pallet and Item-level tracking applications. It can be applied to a wide range of non-metallic objects, making it suitable for use in various other applications like warehouse management, asset tracking, inventory management, box level Tagging, etc',
        description2: 'It performs well on various non-metallic objects, including plastic or cardboard cases & PC surfaces, making it ideal for Retails & multiple industrial applications.',
        features: [
            'Operating Frequency: Global (865-928 MHz)',
            'Interface Protocol: ISO 18000-63 and EPC global Gen2v2',
            'Material: Polyester / paper',
            'IC type: NXP UCODE 8/9',
            'Memory: EPC 96 bits, TID 48 bits',
            'Read range: up to 8 m',
            'Water resistant',
            'Write Cycle Endurance: 100,000 cycles'
        ]
    },
    {
        id: '3',
        title: 'RFID ABS TAGS',
        image: absTagsImg,
        description1: 'ABS RFID is a RAIN(UHF) RFID hard tag with a slim structure specially optimized for securing metal and non-metal assets. With its industry-leading performance, durable outdoor resistance and wide radiation pattern, you can now easily track and monitor any asset or item quickly and reliably.',
        description2: '',
        features: [
            'Operating Frequency: Global (865-928 MHz)',
            'Interface Protocol: ISO 18000-63 and EPC global Gen2v2',
            'Material: ABS',
            'IC type: NXP UCODE 8/9 or Monza M730',
            'Memory: EPC 128 bits, TID 96 bits',
            'Read range: up to 8 m',
            'Durable outdoor resistant & high-level RF performance',
            'IP68 rated'
        ]
    },
    {
        id: '4',
        title: 'RFID CABLE TIE TAGS',
        image: cableTieImg,
        description1: 'The RFID Cable Tie Tag offers an innovative solution for efficient and fast item identification. These cable ties are integrated with an RFID transponder, combining the practicality of traditional cable ties with the advanced capabilities of RFID technology.',
        description2: 'Ideal for securing, tracking, and identifying assets, the RFID Cable Tie Tags are perfect for asset management and inventory control.',
        features: [
            'Operating Frequency: Global (865-928 MHz)',
            'Interface Protocol: ISO 18000-63 and EPC global Gen2v2',
            'Material: ABS',
            'IC type: NXP UCODE 8/9',
            'Memory: EPC 128 bits, TID 96 bits',
            'Read range: up to 6 m',
            'Durable outdoor resistant & high-level RF performance',
            'IP68 rated'
        ]
    },
    {
        id: '5',
        title: 'RFID LAUNDRY TAGS',
        image: laundryImg,
        description1: 'RFID Laundry Tag provides immediate and long-term benefits to RFID laundry management in process and life-cycle traceability. Flexible Laundry Tag is a frequency independent which is ideal for laundry applications and to meet the high mechanical, temperature and chemical resistance required for harsh environments common to laundry applications. Soft, washable & easily bendable Laundry tag operates effectively with a very good read range.',
        description2: '',
        features: [
            'Operating Frequency: Global (865-928 MHz)',
            'Interface Protocol: ISO 18000-63 and EPC global Gen2v2',
            'Material: Silicon/Linen',
            'IC type: NXP UCODE 8/9',
            'Memory: EPC 128 bits, TID 96 bits',
            'Read range: up to 3 m',
            'Waterproof fabric design',
            'IP68 rated',
            '300-400 wash cycles'
        ]
    },
    {
        id: '6',
        title: 'RFID WINDSHIELD TAGS',
        image: windshieldImg,
        description1: 'The RFID Windshield Tag is a high-performance, tamper-proof tag designed for vehicle identification and tracking applications. It comes with strong self-adhesive backing for easy installation on the inner side of vehicle windshields. This tag is flexible, durable, and weather-resistant, ensuring reliable performance in various environmental conditions.',
        description2: '',
        features: [
            'Operating Frequency: Global (865-928 MHz)',
            'Interface Protocol: ISO 18000-63 and EPC global Gen2v2',
            'Material: PET',
            'IC type: NXP UCODE 8/9',
            'Memory: EPC 128 bits, TID 96 bits',
            'Read range: up to 8 m',
            'Operates efficiently on both glass and non-metallic surfaces',
            'Tamper-proof design for secure and permanent usage'
        ]
    },
    {
        id: '7',
        title: 'RFID JEWELRY TAGS',
        image: jewelryImg,
        description1: 'RFID UHF Jewelry Label Tags provide a seamless solution for managing bulk inventory with precision and efficiency. Designed in a unique shape, these non-tearable polyester labels are ideal for jewellery, optical items, and similar applications. Featuring self-adhesive backing, they ensure secure attachment while being easy to remove.',
        description2: '',
        features: [
            'Enables instant and accurate item counts for stock management.',
            'Operating Frequency: Global (865-928 MHz)',
            'Interface Protocol: ISO 18000-63 and EPC global Gen2v2',
            'Material: PET',
            'IC type: Impinj R6P',
            'Memory: EPC 128 bits, TID 96 bits',
            'Read range: up to 3 m',
            'Non-tearable polyester with a laminated finish for longevity.'
        ]
    },
    {
        id: '8',
        title: 'RFID LIBRARY TAGS',
        image: libraryImg,
        description1: 'HF library tags and inlays offer great application flexibility and fit-for-function design in the most demanding applications. The Application area is Books, Documents Tracking, Libraries, Loyalty Cards, and Event Ticketing as well as industrial closed-loop systems for manufacturing automation.',
        description2: '',
        features: [
            'Operating Frequency: 13.56 MHz',
            'ISO/IEC 14443 Type A 1-3, ISO/15693',
            'Material: PET',
            'IC type: NXP MIFARE S50/S70, NXP ICODE SLI',
            'Memory: 1KB/4KB',
            'Read range: 8-10 cm',
            '3M self adhesive'
        ]
    },
    {
        id: '9',
        title: 'RFID TYRE TAGS',
        image: tyreImg,
        description1: 'The RFID Tyre Tag is a high-performance solution designed for effective tire management across a wide range of vehicles, including trucks, trailers, buses, motorcycles, and personal cars. These tags are engineered to withstand extreme temperatures and the harsh conditions encountered during tire re-treading and everyday usage. Made from durable tire rubber and equipped with advanced RFID technology, these tags ensure reliable identification, inventory management, and theft protection throughout the tire\'s lifespan.',
        description2: '',
        features: [
            'Built to endure the high heat from the tire re-stepping process',
            'Operating Frequency: Global (865-928 MHz)',
            'Interface Protocol: ISO 18000-63 and EPC global Gen2v2',
            'Material: Rubber',
            'IC type: Alien Higgs-3/4, Monza 4',
            'Memory: EPC 128 bits, TID 96 bits',
            'Read range: up to 6 m',
            'Designed to function effectively throughout the tire\'s operational life'
        ]
    }
];

const NewRFIDTags = () => {
    return (
        <section className="service_section pt-5 pb-80 bg-light xb-hidden">
            <div className="container">
                {/* Enhanced Header Section with Highlight */}
                <div className="heading_block text-center mb-5">
                    <div className="heading_focus_text has_underline d-inline-flex mb-3">
                        Our Products
                    </div>
                    <div className="position-relative mb-4">
                        <h2 className="heading_text mb-0 position-relative z-2">
                            RFID Tags
                        </h2>
                        <div className="title-glow" style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '300px',
                            height: '100px',
                            background: 'radial-gradient(circle, rgba(82, 39, 255, 0.2) 0%, transparent 70%)',
                            filter: 'blur(20px)',
                            zIndex: '1'
                        }}></div>
                    </div>
                    <p className="mb-0" style={{maxWidth: '900px', margin: '0 auto'}}>
                        UHF RFID Tags are a type of passive RFID tag that is commonly used for asset tracking. RFID labels have a read range that can vary depending on the size of the tag and the specific RFID application, but can typically be read from several meters away. This makes them ideal for tracking assets across large areas or in complex environments.
                    </p>
                    <p className="mt-3" style={{maxWidth: '900px', margin: '0 auto'}}>
                        Discover a wide selection of high-quality UHF RFID tags, designed for diverse applications like logistics, race timing, and asset tracking. Our advanced tags feature durable designs with an integrated circuit, antenna, and protective material for reliable performance on various surfaces.
                    </p>
                </div>

                <div className="rfid-products-grid">
                    {rfidTagsData.map((product, index) => (
                        <div key={product.id} className="product-card mb-5">
                            <div className="row g-4 align-items-stretch">
                                {/* Left Column: Number, Title, and Image Combined */}
                                <div className="col-lg-6">
                                    <div className="left-column-content h-100" style={{
                                        backgroundColor: '#f0f5ff',
                                        borderRadius: '15px',
                                        padding: '30px',
                                        border: '2px solid #e0e7ff',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%'
                                    }}>
                                        {/* Number and Title Section */}
                                        <div className="number-title-section mb-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="number-circle me-3" style={{
                                                    width: '70px',
                                                    height: '70px',
                                                    minWidth: '70px',
                                                    backgroundColor: '#5227FF',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '28px',
                                                    fontWeight: '700',
                                                    boxShadow: '0 8px 20px rgba(82, 39, 255, 0.3)'
                                                }}>
                                                    {index + 1}
                                                </div>
                                                <h3 style={{
                                                    color: '#5227FF',
                                                    fontWeight: '800',
                                                    fontSize: '1.4rem',
                                                    textTransform: 'uppercase',
                                                    lineHeight: '1.4',
                                                    margin: 0,
                                                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                    flex: 1
                                                }}>
                                                    {product.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Image Section - Takes remaining space */}
                                        <div className="image-section flex-grow-1" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minHeight: '300px'
                                        }}>
                                            <div className="product-image-container" style={{
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                                backgroundColor: 'white',
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '20px'
                                            }}>
                                                <img 
                                                    src={product.image} 
                                                    alt={product.title}
                                                    className="img-fluid"
                                                    style={{
                                                        objectFit: 'contain',
                                                        maxHeight: '280px',
                                                        maxWidth: '100%'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Description and Features */}
                                <div className="col-lg-6">
                                    <div className="product-content h-100" style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%'
                                    }}>
                                        <div className="description mb-4">
                                            {product.description1 && (
                                                <p style={{
                                                    fontSize: '1.05rem',
                                                    lineHeight: '1.7',
                                                    color: '#333',
                                                    marginBottom: '15px'
                                                }}>
                                                    {product.description1}
                                                </p>
                                            )}
                                            {product.description2 && (
                                                <p style={{
                                                    fontSize: '1.05rem',
                                                    lineHeight: '1.7',
                                                    color: '#333'
                                                }}>
                                                    {product.description2}
                                                </p>
                                            )}
                                        </div>

                                        <div className="features">
                                            <h5 style={{
                                                color: '#5227FF',
                                                fontWeight: '700',
                                                fontSize: '1.2rem',
                                                marginBottom: '15px',
                                                paddingBottom: '10px',
                                                borderBottom: '2px solid #e0e7ff'
                                            }}>
                                                Key Features
                                            </h5>
                                            <ul className="features-list list-unstyled" style={{
                                                backgroundColor: '#f8f9fa',
                                                padding: '20px',
                                                borderRadius: '8px',
                                                border: '1px solid #e9ecef',
                                                height: '100%'
                                            }}>
                                                {product.features.map((feature, idx) => (
                                                    <li key={idx} className="mb-2" style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        fontSize: '0.95rem',
                                                        lineHeight: '1.6',
                                                        color: '#444'
                                                    }}>
                                                        <span className="me-2" style={{
                                                            color: '#5227FF',
                                                            fontWeight: 'bold',
                                                            minWidth: '20px'
                                                        }}>
                                                            •
                                                        </span>
                                                        <span style={{flex: 1}}>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Divider between products */}
                            {index < rfidTagsData.length - 1 && (
                                <div className="product-divider mt-5 position-relative" style={{
                                    height: '2px',
                                    width: '100%',
                                    background: 'linear-gradient(90deg, transparent, #5227FF, transparent)',
                                    opacity: '0.3'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        backgroundColor: '#f8f9fa',
                                        padding: '0 20px',
                                        color: '#5227FF',
                                        fontWeight: '600',
                                        fontSize: '0.9rem'
                                    }}>
                                        ● ● ●
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .product-card {
                    padding: 35px;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border: 1px solid #e0e7ff;
                }
                
                .product-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 35px rgba(82, 39, 255, 0.15);
                }
                
                .highlighted-title {
                    position: relative;
                    overflow: hidden;
                }
                
                .highlighted-title::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                        45deg,
                        transparent 30%,
                        rgba(255, 255, 255, 0.1) 50%,
                        transparent 70%
                    );
                    animation: shine 3s infinite;
                }
                
                @keyframes shine {
                    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
                }
                
                @media (max-width: 991px) {
                    .product-card {
                        padding: 25px;
                    }
                    
                    .number-circle {
                        width: 60px !important;
                        height: 60px !important;
                        font-size: 24px !important;
                    }
                    
                    h3 {
                        font-size: 1.2rem !important;
                    }
                    
                    .left-column-content {
                        margin-bottom: 20px;
                    }
                }
                
                @media (max-width: 768px) {
                    .product-card {
                        padding: 20px;
                    }
                    
                    .number-circle {
                        width: 50px !important;
                        height: 50px !important;
                        font-size: 20px !important;
                    }
                    
                    h3 {
                        font-size: 1.1rem !important;
                    }
                    
                    .image-section {
                        min-height: 250px !important;
                    }
                    
                    .product-image-container img {
                        max-height: 200px !important;
                    }
                }
                
                @media (max-width: 576px) {
                    .product-card {
                        padding: 15px;
                    }
                    
                    .left-column-content,
                    .product-content {
                        padding: 20px !important;
                    }
                    
                    .number-title-section {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .number-circle {
                        margin-right: 0 !important;
                        margin-bottom: 15px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default NewRFIDTags;