import React from "react";
import styled from "styled-components";

import Section from "../UI/Layout/Section";
import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Flex from "../UI/Layout/Flex";
// import H1 from "../UI/Typography/H1";

import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import GoalFilter from "../GoalFilter/GoalFilter";

const User = styled(Flex)`
  ${({ theme }) => theme.mixins.transitionStandard("width")}
  position: relative;
  font-size: 16px;
  min-width: 200px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    font-size: 18px;
  }
`;

const Wrapper = styled(Section)`
  position: relative;
  z-index: 2;
`;

// const Branding = styled(Container)`
//   border-bottom: 1px solid gray;
// `;

const Header = ({ store, setStore, stravaAuthEndpoint }) => {
  const { token, athlete } = store;
  return (
    <Wrapper className="Top" mb={[3, null, null, 4]}>
      {/* <Branding py={[2, null, null, 2]}>
        <Row
          flexDirection="row"
          alignItems="flex-start"
          justifyContent={["space-between"]}
          flexWrap="no-wrap"
        >
          <Column>
            <H1 fontSize="20px">Annual goal</H1>
          </Column>
          <Column></Column>
        </Row>
      </Branding> */}
      <Container>
        <Row
          flexDirection="row"
          alignItems="flex-start"
          justifyContent={["space-between"]}
        >
          <Column>
            <User alignItems={["center", null, null, "center"]} py={[2]}>
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
          {/* <Column>Settings</Column> */}
          <Column width={1}>
            <GoalFilter store={store} setStore={setStore} />
          </Column>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Header;
