import React from "react";
import styled from "styled-components";

import Section from "../UI/Layout/Section";
import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Flex from "../UI/Layout/Flex";
import Box from "../UI/Layout/Box";

import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import GoalFilter from "../GoalFilter/GoalFilter";
import ActivityPicker from "../ActivityPicker/ActivityPicker";

const Wrapper = styled(Section)`
  position: relative;
  z-index: 2;
  font-size: 16px;

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    font-size: 18px;
  }
`;

const User = styled(Flex)`
  ${({ theme }) => theme.mixins.transitionStandard("width")}
  position: relative;
  min-width: 200px;
`;

const Header = ({ store, setStore, stravaAuthEndpoint }) => {
  const { token, athlete } = store;

  return (
    <Wrapper className="Top" mb={[3, null, null, 4]}>
      <Container>
        <Row
          flexDirection="row"
          alignItems="flex-start"
          justifyContent={["space-between"]}
        >
          <Column width={1 / 2}>
            <User
              alignItems={["center", null, null, "center"]}
              pt={[2]}
              pb={["4px"]}
            >
              {!token.accessToken ? (
                <Login loginLink={stravaAuthEndpoint} />
              ) : (
                <Profile
                  store={store}
                  setStore={setStore}
                  profile={athlete.profile}
                />
              )}
            </User>
          </Column>
          <Column width={1 / 2} textAlign="right">
            <ActivityPicker store={store} setStore={setStore} />
            <Box mt="-2px">{store.goal} km</Box>
          </Column>
          <GoalFilter store={store} setStore={setStore} />
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Header;
