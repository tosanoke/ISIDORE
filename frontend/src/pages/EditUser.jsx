import { useQuery, gql, useMutation } from "@apollo/client";
import { Wrapper, Form, Button } from "./CreateUser";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GET_USER = gql`
  query user($userId: ID!) {
    user(id: $userId) {
      firstname
      lastname
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $firstname: String
    $lastname: String
    $email: String
    $id: ID!
  ) {
    updateUser(
      id: $id
      firstname: $firstname
      lastname: $lastname
      email: $email
    ) {
      firstname
      id
      lastname
      email
    }
  }
`;

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const { loading, error } = useQuery(GET_USER, {
    variables: { userId: id },
    onCompleted: (data) => {
      setValues(data.user);
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      navigate(`/`);
    },
  });
  
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateUser({ variables: { id: id, ...values } });
  };

  if (loading) return "Loading...";
  if (error) return <p>Error! User not found</p>;

  if (loading === false) {
    return (
      <Wrapper>
        <Form onSubmit={onSubmit}>
          <label htmlFor="firstname">Firstname:</label>
          <input
            required
            type="text"
            id="firstname"
            name="firstname"
            value={values.firstname}
            placeholder="firstname"
            onChange={onChange}
          />

          <label htmlFor="password">Lastname:</label>
          <input
            required
            type="text"
            id="lastname"
            name="lastname"
            value={values.lastname}
            placeholder="lastname"
            onChange={onChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={values.email}
            placeholder="Email"
            onChange={onChange}
          />

          <Button type="submit">update user</Button>
        </Form>
      </Wrapper>
    );
  }
};

export default EditUser;
