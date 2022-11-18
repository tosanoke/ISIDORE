import React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const GET_USERS = gql`
  query users {
    users {
      firstname
      lastname
      email
      id
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleClick = (id) => {
    deleteUser({ variables: { deleteUserId: id } });
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Wrapper>
      {data.users.map((user) => (
        <User key={user.id}>
          <p>
            {user.firstname} {user.lastname}
          </p>
          <p>{user.email}</p>
          <Button onClick={() => handleEdit(user.id)}>edit</Button>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => handleClick(user.id)}
          >
            delete
          </Button>
        </User>
      ))}

      <Button onClick={() => navigate('/create')}>Add Users</Button>
    </Wrapper>
  );
};

export default Home;

export const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;
export const User = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em;
`;

export const Button = styled.button`
  display: block;
  margin: 1em 0;
  background: blue;
  color: #ffffff;
`;
