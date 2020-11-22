import React from "react";
import styled from "styled-components";

import Section from "../UI/Layout/Section";
import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Box from "../UI/Layout/Box";

import Login from "../Login/Login";
import Profile from "../Profile/Profile";
// import GoalFilter from "../GoalFilter/GoalFilter";
// import ActivityPicker from "../ActivityPicker/ActivityPicker";
import { currentYear } from "../../helpers/getDates";

const Wrapper = styled(Section)`
  position: relative;
  z-index: 2;
  font-size: 16px;

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    font-size: 18px;
  }
`;

const Top = styled(Row)`
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.grayMedium}; */
`;
const Title = styled.h1`
  font-size: 20px;
  padding-left: 16px;
  font-weight: 800;
  span {
    color: ${({ theme }) => theme.colors.orange};
    display: inline-block;
    margin-left: 2px;
  }
  /* text-transform: uppercase; */
`;

const Header = ({ store, setStore, stravaAuthEndpoint }) => {
  const { token, athlete } = store;

  return (
    <Wrapper className="Top" mb={[3, null, null, 4]}>
      <Container style={{ padding: 0 }}>
        <Top paddingY={2} alignItems="center" justifyContent="space-between">
          <Column>
            <Title>
              Annual Goal <span>{currentYear}</span>
            </Title>
          </Column>
          <Column alignItems="flex-end">
            <Box paddingRight={["16px"]}>
              {!token.accessToken ? (
                <Login loginLink={stravaAuthEndpoint} />
              ) : (
                <Profile
                  store={store}
                  setStore={setStore}
                  profile={athlete.profile}
                />
              )}
            </Box>
          </Column>
        </Top>
      </Container>
      <Container>
        <Row
          flexDirection="row"
          alignItems="flex-start"
          justifyContent={["space-between"]}
        >
          <Column width={1 / 2}></Column>
          {/* <Column width={1 / 2} textAlign="right">
            <ActivityPicker store={store} setStore={setStore} />
            <Box mt="-2px">{store.goal} km</Box>
          </Column> */}
          {/* <GoalFilter store={store} setStore={setStore} /> */}
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Header;
