import React from "react";
import styled from "styled-components";
import Box from "../UI/Layout/Box";
import Flex from "../UI/Layout/Flex";
import Text from "../UI/Typography/Text";
import { currentYear } from "../../helpers/getDates";

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
  text-align: left;
`;

const Profile = ({ store, setStore, profile }) => {
  //   const { menu } = store;

  const { firstName, lastName, image } = profile;
  return (
    <Flex>
      <ProfilePicture mr={[1, null, null, 1]}>
        <img src={image} alt={`${firstName} ${lastName}`} />
      </ProfilePicture>
      <ProfileDetails pl={"4px"}>
        <Text lineHeight="1.3em" as="div">
          {firstName} {lastName}
        </Text>
        <Text lineHeight="1.3em" as="div">
          {currentYear}
        </Text>
      </ProfileDetails>
    </Flex>
  );
};

export default Profile;
