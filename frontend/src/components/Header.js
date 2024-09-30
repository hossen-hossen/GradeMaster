/* eslint-disable react-hooks/exhaustive-deps */
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from "reactstrap";
import { useAppSelector } from "../redux/store";
import { useState, useEffect } from 'react';
import headerImg from '../assets/img/header.png';
import userImg from '../assets/img/user.png';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useLogoutUserMutation } from "../redux/api/getMeAPI";

const Header = () => {
    const user = useAppSelector((state) => state.userState.user);
    const [logoutUser, { isLoading, isSuccess, error, isError, data }] = useLogoutUserMutation();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const location = useLocation();

    const currentRoute = location.pathname;
    useEffect(() => {
        if (isSuccess) {
            window.location.href = '/login';
        }

        if (isError) {
            const errorMessage = typeof error?.data === 'string' ? error.data : error?.data?.message || 'An unknown error occurred';
            if (isSuccess && data?.message) {
                toast.success(data.message);
            }
            if (isError) {
                toast.error(errorMessage, { position: 'top-right' });
                console.error('Error:', errorMessage);
            }
        }
    }, [isLoading]);

    const onLogoutHandler = () => {
        logoutUser();
    };

    return (
        <header>
            <div className="container">
                <Navbar expand="md">
                    <NavbarBrand href={user ? '/courses' : '/'}>
                        <img src={headerImg} alt="GradeMaster" className="logo-image" />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} className="ms-auto" />
                    <Collapse isOpen={isOpen} navbar>
                        {user && (
                            <Nav className="ms-auto" navbar>
                                <NavItem className="nav-item-responsive">
                                    <NavLink className={currentRoute.includes('/courses') ? 'active' : ''} onClick={() => navigate('/courses')}>
                                        Courses
                                    </NavLink>
                                </NavItem>
                                <NavItem className="nav-item-responsive">
                                    <NavLink className={currentRoute.includes('/students') ? 'active' : ''} onClick={() => navigate('/students')}>
                                        Students
                                    </NavLink>
                                </NavItem>
                                <NavItem className="nav-item-responsive">
                                    <NavLink className={currentRoute.includes('/enrollments') ? 'active' : ''} onClick={() => navigate('/enrollments')}>
                                        Enrollment
                                    </NavLink>
                                </NavItem>
                                <NavItem className="nav-item-responsive">
                                    <NavLink className={currentRoute.includes('/attendances') ? 'active' : ''} onClick={() => navigate('/attendances')}>
                                        Attendance
                                    </NavLink>
                                </NavItem>
                                <NavItem className="nav-item-responsive">
                                    <NavLink className={currentRoute.includes('/tasks') ? 'active' : ''} onClick={() => navigate('/tasks')}>
                                        Tasks
                                    </NavLink>
                                </NavItem>
                                <NavItem className="nav-item-responsive">
                                    <NavLink className={currentRoute.includes('/task-submissions') ? 'active' : ''} onClick={() => navigate('/task-submissions')}>
                                        Submissions
                                    </NavLink>
                                </NavItem>
                                <NavItem className="nav-item-responsive">
                                    <NavLink className={currentRoute.includes('/gradeweight') ? 'active' : ''} onClick={() => navigate('/gradeweights')}>
                                        Grade Weight
                                    </NavLink>
                                </NavItem>

                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <img src={userImg} alt="user" className="user-img" />
                                    </DropdownToggle>
                                    <DropdownMenu end style={{ textAlign: 'left' }}>
                                        <DropdownItem onClick={onLogoutHandler}>Logout</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        )}
                    </Collapse>
                </Navbar>
            </div>
        </header>
    );
};

export default Header;
