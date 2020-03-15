import React from "react";
import styled from "styled-components";
import Flex from "../UI/Layout/Flex";
import Box from "../UI/Layout/Box";

const Wrapper = styled(Flex)`
  background-color: white;
  font-size: 16px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    font-size: 18px;
  }
`;

const ProfilePicture = styled(Box)`
  position: relative;
  border-radius: 60px;
  overflow: hidden;
  width: 32px;
  height: 32px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    width: 48px;
    height: 48px;
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

const ProfileDetails = styled(Box)`
  line-height: 1.5em;
`;

const Profile = ({ profile }) => {
  const { firstName, lastName, image } = profile;
  return (
    <Wrapper
      alignItems={["center", null, null, "center"]}
      px={[2, null, null, 2]}
      py={[1, null, null, 2]}
    >
      <ProfilePicture mr={[1, null, null, 1]}>
        <img src={image} alt={`${firstName} ${lastName}`} />
      </ProfilePicture>
      <ProfileDetails pl={"4px"}>
        {firstName} {lastName}
      </ProfileDetails>
    </Wrapper>
  );
};

export default Profile;
