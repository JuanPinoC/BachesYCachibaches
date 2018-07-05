import React from 'react';
import {NavLink} from 'react-router-dom';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationItemsUser from '../NavigationItems/NavigationItemsLoggedUser';
import classes from './SideDrawer.css';
import Backdrop from '../../Backdrop/Backdrop';
import SearchBar from '../SearchBar/SearchBar';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                <NavLink to="/" exact>
                    <Logo />
                </NavLink>
                </div>
                <nav>
                {(sessionStorage.getItem('jwtToken')!="null")?
                <NavigationItemsUser action={props.action}/>:<NavigationItems/>}
                </nav>
                <div className={classes.SearchBar}>
                    <SearchBar/>
                </div>
            </div>
        </Aux>
    );
};

export default sideDrawer;