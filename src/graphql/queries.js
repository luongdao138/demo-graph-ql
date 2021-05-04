import { gql } from '@apollo/client';

export const FETCH_POSTS = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
        createdAt
        id
        user {
          avatar
        }
      }
      commentCount
      comments {
        username
        createdAt
        id
        body
        user {
          avatar
        }
      }
      user {
        createdAt
        avatar
        id
      }
    }
  }
`;

export const GET_USER = gql`
  query {
    getUser {
      id
      email
      username
      createdAt
      avatar
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query getSinglePostMutation($postId: ID!) {
    getPostById(id: $postId) {
      id
      body
      username
      createdAt
      likes {
        username
        id
        createdAt
        user {
          avatar
        }
      }
      likeCount
      comments {
        id
        username
        createdAt
        body
        user {
          avatar
        }
      }
      user {
        avatar
        id
        createdAt
      }
      commentCount
    }
  }
`;

export const GET_BY_USERNAME = gql`
  query getByUsernameQuery($username: String!) {
    getUserByUsername(username: $username) {
      id
      email
      createdAt
      username
      shortBio
      website
      location
      avatar
      posts {
        id
        body
        username
        createdAt
        likes {
          createdAt
          username
          id
          user {
            avatar
          }
        }
        likeCount
        comments {
          id
          username
          createdAt
          body
          user {
            avatar
          }
        }
        user {
          createdAt
          avatar
          id
        }
        commentCount
      }
    }
  }
`;
