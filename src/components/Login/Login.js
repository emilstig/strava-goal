import React from "react";

import { Button } from "../UI/Button/Button";
import Row from "../UI/Layout/Grid/Row";
import Column from "../UI/Layout/Grid/Column";
import Flex from "../UI/Layout/Flex";
import Box from "../UI/Layout/Box";

const Login = ({ loginLink }) => {
  return (
    <React.Fragment>
      <Row alignItems="flex-end" justifyContent="flex-end">
        <Column width={[12 / 12, null, 6 / 12, 4 / 12]}>
          <Flex flexDirection={("row", null, null, "column")}>
            <Box pr={[1, null, null, 1]} mb={[0, null, null, 1]}>
              {/* <Label pl={[1, null, null, 1]}>Login</Label> */}
            </Box>
            <Box width="100%">
              <Button type="number">
                <a href={loginLink} targe="_self">
                  <span>Login with Strava</span>
                </a>
              </Button>
            </Box>
          </Flex>
        </Column>
      </Row>
    </React.Fragment>
  );
};

export default Login;
