import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, MenuList } from "@chakra-ui/react";

const MenuComponent = () => {
    return (
        <Menu className='Menu'>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='ghost'
                colorScheme={'black'}
                size={'lg'}
            />
            <MenuList color='black'>
                <Link to='/'>
                    <MenuItem>
                        Vehicles
                    </MenuItem>
                </Link>
                {/* <Link to='/manage'>
                    <MenuItem>
                        Manage vehicles
                    </MenuItem>
                </Link> */}
            </MenuList>
        </Menu>
    );
    }

export default MenuComponent;