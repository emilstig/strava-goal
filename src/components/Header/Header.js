import React from "react";
import styled from "styled-components";

import Container from "../UI/Layout/Grid/Container";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Box from "../UI/Layout/Box";

import Login from "../Login/Login";
import Profile from "../Profile/Profile";
// import GoalFilter from "../GoalFilter/GoalFilter";
// import ActivityPicker from "../ActivityPicker/ActivityPicker";
import { currentYear } from "../../helpers/getDates";

const Wrapper = styled(Container)`
  position: relative;
  z-index: 2;
  font-size: 16px;
  height: 70px;
  background-color: white;
  justify-content: center;

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    font-size: 18px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  padding-left: 16px;
  line-height: 1;
  font-weight: 800;

  span {
    color: ${({ theme }) => theme.colors.orange};
    display: inline-block;
    margin-left: 2px;
  }
`;

const Header = ({ store, setStore, stravaAuthEndpoint }) => {
  const { token, athlete } = store;

  return (
    <Wrapper mb={[3, null, null, 4]}>
      <Row paddingY={2} alignItems="center" justifyContent="space-between">
        <Column>
          <Title>
            My Annual Goal <span>{currentYear}</span>
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
      </Row>
    </Wrapper>
  );
};

export default Header;
