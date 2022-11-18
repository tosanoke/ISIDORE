import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';



export const Wrapper = styled.div` 
    border: 1px solid #f5f4f0; 
    max-width: 500px; 
    padding: 1em;
    margin: 0 auto;
    `;

export const Form = styled.form` 
label, input {
        display: block;
        line-height: 2em;
}`

export const Button = styled.button` 
        display: block;
        margin: 1em 0;
        color: #ffffff;
        background-color: #3249de;`

const CREATE_USER = gql`
mutation createUser($firstname: String!, $lastname: String!, $email: String!) {
    createUser(firstname: $firstname, lastname: $lastname, email: $email ) {
         firstname
         id
         lastname
         email
    }
  }
`

const CreateUser = (props) => {
  const [values, setValues] = useState({});
  const navigate = useNavigate()
  const [createUser ] = useMutation(CREATE_USER, {
    onCompleted: () => {
        navigate('/');
    }
  });

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    createUser({ variables: {...values} });
  }

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <label htmlFor="firstname">Firstname:</label>
        <input
          required
          type="text"
          id="firstname"
          name="firstname"
          placeholder="firstname"
          onChange={onChange}
        />

        <label htmlFor="password">Lastname:</label>
        <input
          required
          type="text"
          id="lastname"
          name="lastname"
          placeholder="lastname"
          onChange={onChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
        />

        <Button type="submit">Add new user</Button>
      </Form>
    </Wrapper>
  );
};

export default CreateUser;
