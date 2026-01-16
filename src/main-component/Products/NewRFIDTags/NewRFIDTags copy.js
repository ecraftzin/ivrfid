import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const rfidTagsData = [
    {
        id: '1',
        title: 'RFID on metal Tags',
        image: onMetalImg,
        description1: 'On metal flexible label can be stuck on metallic assets easily, especially for irregular and uneven surfaces, it has good performance on the metal surface, and can be printed and encoded by an RFID printer.',
        description2: 'They offer an extended reading range, making them competent for disparate application areas.',
        features: [
            'Operating Frequency: Global (865-928 MHz)',
            'Interface Protocol: ISO 18000-63 and EPC global Gen2v2',
            'Material: PET / Synthetic Polyester',
            'IC type: Impinj Monza R6P or Monza M730',
            'Memory: EPC 96 bits, TID 48 bits',
            'Read range: up to 6 m',
            'IP68 rated',
            'Write Cycle Endurance: 100,000 cycles',
            'Available Sizes: 50 x 15 mm, 60 x 25 mm, 70 x 30 mm and customized sizes available upon request',
            'Superior adhesion on various surfaces including metal and plastic',
            'Applicable Surface Materials: All surfaces, optimized for metal',
            'Customized printing of logo, text, barcode, etc.',
            'Customer specific encoding of EPC'
        ]
    },
    {
        id: '2',
        title: 'Non-metal RFID Tags',
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
            'Write Cycle Endurance: 100,000 cycles',
            'Available Sizes: 50 x 35 mm, 50 x 50 mm, 72 x 27 mm, 90 x 30 mm, 97 x 27 mm and customized sizes available upon request.',
            '3M self-adhesive',
            'Applicable Surface Materials: Non-metallic surfaces',
            'Customized printing of logo, text, barcode, etc.',
            'Customer specific encoding of EPC'
        ]
    },
    {
        id: '3',
        title: 'RFID ABS Tags',
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
            'IP68 rated',
            'Write Cycle Endurance: 100,000 cycles',
            'Available Sizes: 70 x 25 mm, 79 x 31 mm, 88 x 27 mm and customized sizes available upon request.',
            'Self-adhesive',
            'Applicable Surface Materials: All surfaces',
            'Customized printing of logo, text, barcode, etc.',
            'Customer specific encoding of EPC'
        ]
    },
    {
        id: '4',
        title: 'RFID Cable Tie Tags',
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
            'IP68 rated',
            'Write Cycle Endurance: 100,000 cycles',
            'Available Sizes: 79 x 29 mm and customized sizes available upon request.',
            'Applicable Surface Materials: All surfaces.',
            'Customized printing of logo, text, barcode, etc.',
            'Customer specific encoding of EPC'
        ]
    },
    {
        id: '5',
        title: 'RFID Laundry Tags',
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
            '300-400 wash cycles',
            'Available Sizes: 70 x 15 mm and customized sizes available upon request.',
            'Can be stitched or adhesive-mounted for versatility',
            'Customized printing of logo, text, barcode, etc.',
            'Customer specific encoding of EPC'
        ]
    },
    {
        id: '6',
        title: 'RFID Windshield tags',
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
            'Available Sizes: 90 x 30 mm, 97 X 27 mm and customized sizes available upon request.',
            'Self-adhesive backing for easy and quick installation on windshields',
            'Customized printing of logo, text, barcode, etc.',
            'Customer specific encoding of EPC',
            'Tamper-proof design for secure and permanent usage'
        ]
    },
    {
        id: '7',
        title: 'RFID Jewelry tags',
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
            'Non-tearable polyester with a laminated finish for longevity.',
            'Available Sizes: 68x26 mm and customized sizes available upon request.',
            'Provides strong adhesion yet allows easy removal',
            'Customized printing of logo, text, barcode, etc.',
            'Customer specific encoding of EPC',
            'Resistant to wear and tear, ensuring labels last in various environments.'
        ]
    },
    {
        id: '8',
        title: 'RFID Library Tags',
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
            '3M self adhesive',
            'Available Sizes: 50 x50 mm and customized sizes available upon request.',
            'Provides strong adhesion yet allows easy removal',
            'Customized printing of logo, text, barcode, etc.',
            'Applicable for library management and document tracking solutions'
        ]
    },
    {
        id: '9',
        title: 'RFID Tyre tags',
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
            'Designed to function effectively throughout the tire\'s operational life',
            'Available Sizes: 135 x 85 mm and customized sizes available upon request.',
            '3M industrial adhesive',
            'Customized printing of logo, text, barcode, etc.',
            'Customer specific encoding of EPC',
            'Fully protected against dust and water, making it ideal for outdoor and rough conditions.',
            'Ideal for managing tires across fleets of trucks, buses, and commercial vehicles.'
        ]
    }
];

const NewRFIDTags = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.product_card');
        
        cards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                delay: index * 0.1,
                ease: "power3.out"
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="service_section pt-5 pb-80 bg-light xb-hidden">
            <div className="container">
                <div className="heading_block text-center mb-5">
                    <div className="heading_focus_text has_underline d-inline-flex mb-3">
                        Our Products
                    </div>
                    <h2 className="heading_text mb-3">
                        <mark>RFID Tags</mark>
                    </h2>
                    <p className="mb-0" style={{maxWidth: '900px', margin: '0 auto'}}>
                        UHF RFID Tags are a type of passive RFID tag that is commonly used for asset tracking. RFID labels have a read range that can vary depending on the size of the tag and the specific RFID application, but can typically be read from several meters away. This makes them ideal for tracking assets across large areas or in complex environments.
                    </p>
                    <p className="mt-3" style={{maxWidth: '900px', margin: '0 auto'}}>
                        Discover a wide selection of high-quality UHF RFID tags, designed for diverse applications like logistics, race timing, and asset tracking. Our advanced tags feature durable designs with an integrated circuit, antenna, and protective material for reliable performance on various surfaces.
                    </p>
                </div>

                {rfidTagsData.map((product, index) => (
                    <div key={product.id} className="product_card mb-5">
                        <div className="row align-items-center">
                            <div className="col-lg-5 mb-4 mb-lg-0">
                                <div className="product_image" style={{borderRadius: '10px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.1)'}}>
                                    <img src={product.image} alt={product.title} style={{width: '100%', height: 'auto'}} />
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="product_content">
                                    <h3 className="mb-3" style={{color: '#5227FF'}}>{product.title}</h3>
                                    {product.description1 && <p className="mb-2">{product.description1}</p>}
                                    {product.description2 && <p className="mb-3">{product.description2}</p>}
                                    
                                    <ul className="icon_list unordered_list_block">
                                        {product.features.map((feature, idx) => (
                                            <li key={idx}>
                                                <span className="icon_list_icon">
                                                    <i className="fa-regular fa-circle-dot"></i>
                                                </span>
                                                <span className="icon_list_text">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewRFIDTags;

