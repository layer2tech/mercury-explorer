import './index.css';
import {Link} from 'react-router-dom';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { Squash as Hamburger } from 'hamburger-react'
import { slide as Menu } from 'react-burger-menu';
import { Search } from '../../components';
import { Logo } from '../../images/Logo';
import { useState } from 'react';

// add scroll function look .navigation.scroll in mainstay
// add search
// add menu item with main lists 

const TopNavigation = () => {
    const [isOpen, setOpen] = useState(false)

    return(
        <div className = "navigation" >
            
            <div className = "container" >
                <Navbar color="faded" light expand="lg">
                    <NavbarBrand className="mr-auto" href="/">
                        <Logo />
                    </NavbarBrand>

                    {/* <NavbarToggler onClick={toggleNavbarHandler}/>  DONT UNCOMMENT THIS*/}

                    <Collapse navbar>

                        <Nav className="ml-auto d-flex justify-content-end" navbar>
                            <NavItem className="search-item " id="top-search">
                                <Search 
                                    placeholder = "Search for Address, Swap ID, TxID, ..."/>
                            </NavItem>

                        </Nav>
                    </Collapse>
                    <Hamburger rounded label = "Show menu"
                        toggled={isOpen} toggle={setOpen}
                        size = {34}/>
                </Navbar>

            </div>
            <Menu isOpen = {isOpen}
                closeCallback = {() => setOpen(false)}
                customBurgerIcon={ false }
                backgroundColor={"#E7E7E7"}>
                <div className="menu">

                    <div className = "menu-item search">
                        <NavItem className="search-item " id="top-search">
                            <Search 
                                placeholder = "Address, Swap ID, TxID, ..."/>
                        </NavItem>
                    </div>

                    <div className="menu-item">
                        <Link 
                            className = "link"
                            to = {"/"}
                            onClick={() =>setOpen(false)} >
                            Home
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link 
                            className = "link"
                            to = {"/tx"}
                            onClick={() =>setOpen(false)} >
                            Transactions
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link 
                            className = "link"
                            to = {"/swap"}
                            onClick={() =>setOpen(false)} >
                            Batch Transfers
                        </Link>
                    </div>
                </div>
            </Menu>
        </div>
    )
}

export default TopNavigation;