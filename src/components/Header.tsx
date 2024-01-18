import React, { useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout } from '../redux/slices/AuthSlice'
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import '../assets/css/header.css';
export const Header = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      dispatch(logout()).then((result) => {
        if (true) {
          navigate("/");
        }
      });
    },
    [dispatch, navigate]
  );
  return (
    <div className='header'>
      <div className='container'>
        <ul className='links'>
            <li><NavLink to='/home'>الرئيسية</NavLink></li>
            <li><NavLink to='/products'>المنتجات</NavLink></li>
            <li><NavLink to='/categories'>الأقسام</NavLink></li>
        </ul>
        <div className='userDropDown'>
          <UncontrolledDropdown group>
            <Button color="secondary"  className='btn-sm'>
              {user ? user.user.name: ''}
            </Button>
            <DropdownToggle
              caret
              color="secondary" className='btn-sm'
            />
            <DropdownMenu>
              <DropdownItem>
                <Button className='btn btn-sm' color='danger' onClick={handleLogout}>تسجيل الخروج</Button>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </div>
  )
}
export default Header