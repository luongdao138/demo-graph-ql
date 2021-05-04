import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { useAuthContext } from '../context/auth';

const Notifications = () => {
  const { notifications } = useAuthContext();
  if (!notifications || notifications.length === 0) {
    return <h4>No notifications</h4>;
  }
  return (
    <List>
      {notifications.map((not) => {
        return (
          <List.Item key={not.id} style={{ marginBottom: '12px' }}>
            <List.Icon name='marker' />
            <List.Content>
              <List.Header as={Link} to={`/post/${not.postId}`}>
                {not.body}
              </List.Header>
              <List.Description>
                {moment(not.createdAt).fromNow()}
              </List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default Notifications;
