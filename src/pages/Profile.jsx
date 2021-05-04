import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Image, Card, Icon, Button, Progress } from 'semantic-ui-react';
import Post from '../components/Post';
import { useAuthContext } from '../context/auth';
import { UPDATE_AVATAR } from '../graphql/mutations';
import { GET_BY_USERNAME } from '../graphql/queries';
import { storage } from '../libs/firebase';

const Profile = () => {
  const ref = useRef();
  const { username } = useParams();
  const [updateAvatar] = useMutation(UPDATE_AVATAR);
  const { data, loading, error } = useQuery(GET_BY_USERNAME, {
    variables: { username },
  });
  const [percent, setPercent] = useState(0);
  const { user: loggedInUser, updateAvatar: update } = useAuthContext();

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;
  const { getUserByUsername: user } = data;

  const handleChangeAvatar = (e) => {
    if (!e.target.files[0]) return;

    const image = e.target.files[0];
    const name = `${new Date().toISOString()}_${image.name}`;
    const uploadTask = storage.ref(`avatars/${name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (progress < 100) setPercent(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('avatars')
          .child(name)
          .getDownloadURL()
          .then((url) => {
            updateAvatar({
              variables: {
                userId: user?.id,
                avatar: url,
              },
            }).then((res) => {
              // update();
              update(res.data.updateAvatar.avatar);
              setPercent(100);
            });
          });
      }
    );
  };

  return (
    <div style={{ margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Profile</h1>
      <input type='file' hidden ref={ref} onChange={handleChangeAvatar} />
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image
              fluid
              src={user?.avatar ? user?.avatar : '/images/no-img.png'}
            />
            {percent > 0 && percent < 100 && (
              <Progress
                style={{ margin: '10px 0' }}
                percent={percent}
                success
              />
            )}
            {username === loggedInUser?.username && (
              <Button
                style={{ marginTop: '12px' }}
                basic
                size='tiny'
                floated='right'
                color='green'
                onClick={() => {
                  ref.current.click();
                }}
              >
                <Icon name='edit' />
              </Button>
            )}
          </Grid.Column>
          <Grid.Column width={9}>
            <Card fluid>
              <Card.Content>
                {username === loggedInUser?.username && (
                  <Button
                    style={{ marginTop: '12px' }}
                    basic
                    size='tiny'
                    floated='right'
                    color='green'
                  >
                    <Icon name='edit' />
                  </Button>
                )}
                <Card.Header>{user.username}</Card.Header>
                <Card.Meta>
                  Join in {moment(user.createdAt).format('MMMM Do YYYY')}
                </Card.Meta>
                <Card.Description>Email: {user.email}</Card.Description>
                {user.shortBio && (
                  <Card.Description>
                    Short bio: {user.shortBio}
                  </Card.Description>
                )}
                {user.location && (
                  <Card.Description>Location: {user.location}</Card.Description>
                )}
                {user.website && (
                  <Card.Description>Website: {user.website}</Card.Description>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={3}>
        <Grid.Row>
          {user.posts.map((post) => {
            return (
              <Grid.Column key={post.id}>
                <Post post={post} />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Profile;
