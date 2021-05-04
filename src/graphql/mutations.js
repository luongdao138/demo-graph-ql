import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation addUserMutation(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        email: $email
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      createdAt
      token
      avatar
    }
  }
`;

export const LOGIN = gql`
  mutation loginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      createdAt
      token
      avatar
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPostMutation($body: String!) {
    createPost(body: $body) {
      id
      createdAt
      body
      username
      commentCount
      likeCount
      likes {
        username
      }
      comments {
        username
        id
        createdAt
        body
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePostMutation($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePostMutation($postId: ID!) {
    deletePost(id: $postId)
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteCommentMutation($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createCommentMutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation updateAvatarMutation($userId: ID!, $avatar: String!) {
    updateAvatar(userId: $userId, avatar: $avatar) {
      id
      avatar
    }
  }
`;
