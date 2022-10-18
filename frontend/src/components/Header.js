import React from 'react';
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavbarBrand, NavLink } from 'reactstrap';
import PropTypes from 'prop-types'

export default function Header(props){
    return (
        <>
        <Navbar color="light">
            <NavbarBrand href="/" className="me-auto">
                &nbsp; StuffApp
            </NavbarBrand>
            <NavbarToggler onClick={props.toggleNavbar} className="me-2" />
            <Collapse isOpen={!props.collapsed} navbar>
                <Nav navbar>
                <NavItem>
                    <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <hr />
                <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">
                    Account Settings
                    </NavLink>
                </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
        </>
    )
}
Header.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    toggleNavbar: PropTypes.func.isRequired,
}