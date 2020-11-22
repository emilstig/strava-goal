import React from "react";
import styled from "styled-components";
import Box from "../UI/Layout/Box";
import Flex from "../UI/Layout/Flex";

const ProfilePicture = styled(Box)`
  width: auto;
  position: relative;
  border-radius: 60px;
  overflow: hidden;
  width: 32px;
  height: 32px;

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    width: 32px;
    height: 32px;
  }

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Profile = ({ store, setStore, profile }) => {
  //   const { menu } = store;

  const { firstName, lastName, image } = profile;
  return (
    <ProfilePicture>
      <img src={image} alt={`${firstName} ${lastName}`} />
    </ProfilePicture>
  );
};

export default Profile;
