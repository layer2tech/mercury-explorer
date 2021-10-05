import './index.css';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { Search } from '../../components';
import { Logo } from '../../images/Logo';
import { useState } from 'react';

// add scroll function look .navigation.scroll in mainstay
// add search
// add menu item with main lists 

const TopNavigation = () => {
    const [isNavbarOpened,setIsNavbarOpened] = useState(true)

    const toggleNavbarHandler = () => {
        setIsNavbarOpened(!isNavbarOpened)
    }

    const toggleSlider = () => {
        if (document.querySelector('body').classList.contains('slider-hidden')) {
            document.querySelector('body').classList.remove('slider-hidden');
        } else {
            document.querySelector('body').classList.add('slider-hidden');
        }
    };

    return(
        <div className = "navigation" >
            <div className = "container" >
                <Navbar color="faded" light expand="lg">
                    <NavbarBrand className="mr-auto" href="/">
                        <Logo />
                    </NavbarBrand>

                    <NavbarToggler onClick={toggleNavbarHandler}/>

                    <Collapse isOpen={isNavbarOpened} navbar>

                        <Nav className="ml-auto d-flex justify-content-end" navbar>
                            <NavItem className="search-item " id="top-search">
                                <Search />
                            </NavItem>

                        </Nav>
                    </Collapse> 
                    {/* <NavbarToggler onClick={this.toggleNavbarHandler}/>

                    <Collapse isOpen={this.state.isNavbarOpened} navbar>

                        <Nav className="ml-auto d-flex justify-content-end" navbar>
                            <NavItem className="search-item " id="top-search">
                                <Search />
                            </NavItem>


                            <NavItem className="hover-btn-active none-on-slider" id="show-slider-btn">
                                <Button color="secondary" onClick={this.toggleSlider}>
                                    <img src="icon-eye.svg"/>
                                </Button>
                            </NavItem>

                        </Nav>
                    </Collapse> */}
                </Navbar>

            </div>
        </div>
    )
}

export default TopNavigation;