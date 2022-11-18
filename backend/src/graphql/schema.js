import { gql } from "apollo-server-express";

export const typeDefs = gql`

scalar Date

  type Query {
    users: [Users]
    user(id : ID): Users!
  }

  type Mutation {
    createUser(firstname: String, lastname: String, email: String): Users
    deleteUser(id: ID!): Boolean!
    updateUser(id: ID!, firstname: String, lastname: String, email: String): [Users]
  }

  type Users {
    id: ID!
    firstname: String
    lastname: String
    email: String
  }

 
`;
