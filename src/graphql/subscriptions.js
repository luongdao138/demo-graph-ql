import { gql } from '@apollo/client';

export const SUBSCRIBE_LIKE_POST = gql`
  subscription subscribeLikePost($username: String!) {
    likePost(username: $username) {
      id
      sender
      receiver
      body
      createdAt
      postId
    }
  }
`;

export const SUBSCRIBE_COMMENT_POST = gql`
  subscription subscribeCommentPost($username: String!) {
    commentPost(username: $username) {
      id
      sender
      receiver
      body
      createdAt
      postId
    }
  }
`;
