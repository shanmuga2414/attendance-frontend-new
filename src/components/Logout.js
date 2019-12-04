import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const Logout = (props) => {
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);

    function logout() {
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.props.history.push('/');
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                <PersonPinIcon style={{ fontSize: 35 }} />
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem header><a href="#" onClick={logout}>Logout</a></DropdownItem>

            </DropdownMenu>
        </Dropdown>
    );
}

export default Logout;