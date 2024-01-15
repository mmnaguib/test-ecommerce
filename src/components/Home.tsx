import React, { useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { logout } from '../redux/slices/AuthSlice'
import { Button } from 'reactstrap'
//import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

export const Home = () => {
  const user = useAppSelector(state => state.auth.user)
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
        <ul className='links'>
            <NavLink to='/home'>الرئيسية</NavLink>
            <NavLink to='/products'>المنتجات</NavLink>
            <NavLink to='/categories'>الأقسام</NavLink>
        </ul>
        {/* <UncontrolledDropdown group>
          
          <DropdownToggle
            caret
            color="primary"
          />
          <Button color="primary">
            {user.name}
          </Button>
          <DropdownMenu>
            <DropdownItem header>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
              <Button className='btn btn-sm' color='danger' onClick={handleLogout}>تسجيل الخروج</Button>
    </div>
  )
}
export default Home