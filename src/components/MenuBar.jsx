import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import { useAuthContext } from '../context/auth';

const MenuBar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState();
  const { user, logout } = useAuthContext();

  useEffect(() => {
    const path = location.pathname.slice(1);
    setActiveItem(path === '' ? 'home' : path);
    document.title = path === '' ? 'home' : path;
  }, [location]);
  const handleClick = (e, { name }) => {
    setActiveItem(name);
  };
  console.log(user);

  const menubar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        as={Link}
        to='/'
        name='home'
        active={activeItem === 'home'}
        onClick={handleClick}
      />
      <Menu.Menu style={{ alignItems: 'center' }} position='right'>
        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          as={Link}
          to={`/profile/${user.username}`}
        ></Menu.Item>
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={logout}
        />
        <Image
          as={Link}
          to={`/profile/${user.username}`}
          src={user.avatar ? user.avatar : '/images/no-img.png'}
          avatar
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        as={Link}
        to='/'
        name='home'
        active={activeItem === 'home'}
        onClick={handleClick}
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          as={Link}
          to='/login'
          active={activeItem === 'login'}
          onClick={handleClick}
        />
        <Menu.Item
          name='register'
          as={Link}
          to='/register'
          active={activeItem === 'register'}
          onClick={handleClick}
        />
      </Menu.Menu>
    </Menu>
  );

  return menubar;
};

export default MenuBar;
