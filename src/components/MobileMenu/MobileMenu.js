import React, { Fragment, useState, useEffect } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import { Link } from "react-router-dom";
import { getProductCategories, getSolutionCategories } from '../../services/categoriesService';

const MobileMenu = () => {
    const [openId, setOpenId] = useState(0);
    const [productCategories, setProductCategories] = useState([]);
    const [solutionCategories, setSolutionCategories] = useState([]);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const [products, solutions] = await Promise.all([
                getProductCategories(),
                getSolutionCategories()
            ]);
            setProductCategories(products);
            setSolutionCategories(solutions);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    // Build dynamic menus
    const menus = [
        {
            id: 1,
            title: 'Home',
            link: '/home',
        },
        {
            id: 2,
            title: 'About Us',
            link: '/about',
        },
        {
            id: 3,
            title: 'Products',
            link: '/products',
            submenu: productCategories.map((cat, index) => ({
                id: 100 + index,
                title: cat.name,
                link: `/products/${cat.slug}`
            }))
        },
        {
            id: 4,
            title: 'Solutions',
            link: '/solutions',
            submenu: solutionCategories.map((cat, index) => ({
                id: 200 + index,
                title: cat.name,
                link: `/solutions/${cat.slug}`
            }))
        },
        {
            id: 5,
            title: 'Contact',
            link: '/contact',
        }
    ];

    return (
        <ul className="main_menu_list clearfix">
            {menus.map((item, mn) => {
                return (
                    <ListItem className={item.id === openId ? 'active' : null} key={mn}>
                        {item.submenu ?
                            <Fragment>
                                <p onClick={() => setOpenId(item.id === openId ? 0 : item.id)}>{item.title}
                                    <i className={item.id === openId ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
                                </p>
                                <Collapse in={item.id === openId} timeout="auto" unmountOnExit>
                                    <List className="subMenu">
                                        <Fragment>
                                            {item.submenu.map((submenu, i) => {
                                                return (
                                                    <ListItem key={i}>
                                                        <Link onClick={ClickHandler} className="active"
                                                            to={submenu.link}>{submenu.title}</Link>
                                                    </ListItem>
                                                )
                                            })}
                                        </Fragment>
                                    </List>
                                </Collapse>
                            </Fragment>
                            : <Link className="active"
                                to={item.link}>{item.title}</Link>
                        }
                    </ListItem>
                )
            })}
        </ul>
    )
}

export default MobileMenu;