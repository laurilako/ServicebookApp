import React from 'react';
import '../Styles/Header.css';
import { IconButton, Menu, MenuButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='Header'>
            <Link to='/'>
                <h1>SERVICEBOOK</h1>
            </Link>
        </div>

    );
};

export default Header;