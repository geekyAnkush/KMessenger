import { gql } from "@apollo/client";

const UserOperations = {
  Queries: {},
  Mutations: {
    createUsername: gql`
      mutation CreateUsername($username: String!) {
        createUsername(username: $username) {
          success
          error
        }
      }
    `,
  },
  Subscription: {},
};
export default UserOperations;
