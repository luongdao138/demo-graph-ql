import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Image, Popup } from 'semantic-ui-react';
import { useAuthContext } from '../context/auth';
import { IconButton, Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useMutation, useSubscription } from '@apollo/client';
import { RESET_NOTS } from '../graphql/mutations';
import {
  SUBSCRIBE_LIKE_POST,
  SUBSCRIBE_COMMENT_POST,
} from '../graphql/subscriptions';
import Notifications from './Notifications';

const MenuBar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState();
  const [resetNot] = useMutation(RESET_NOTS);
  const { user, logout, newNot, resetNotification } = useAuthContext();
  const { data } = useSubscription(SUBSCRIBE_LIKE_POST, {
    variables: {
      username: user?.username,
    },
  });
  const { data: newNotComment } = useSubscription(SUBSCRIBE_COMMENT_POST, {
    variables: {
      username: user?.username,
    },
  });

  useEffect(() => {
    const path = location.pathname.slice(1);
    setActiveItem(path === '' ? 'home' : path);
    document.title = path === '' ? 'home' : path;
  }, [location]);

  useEffect(() => {
    if (data) {
      newNot(data.likePost);
    }
  }, [data]);

  useEffect(() => {
    if (newNotComment) {
      newNot(newNotComment.commentPost);
    }
  }, [newNotComment]);
  // console.log(data, loading);

  const handleClick = (e, { name }) => {
    setActiveItem(name);
  };

  const handleNot = () => {
    if (user.activeNots > 0) {
      resetNot();
      resetNotification();
    }
  };

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
        {user && (
          <Popup
            content={<Notifications />}
            on='click'
            trigger={
              <IconButton
                size='medium'
                style={{ marginLeft: '6px' }}
                onClick={handleNot}
              >
                {user.activeNots > 0 ? (
                  <Badge badgeContent={user.activeNots} color='secondary'>
                    <NotificationsIcon />
                  </Badge>
                ) : (
                  <NotificationsIcon />
                )}
              </IconButton>
            }
          />
        )}
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
