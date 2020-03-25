import React from "react";

import { Button } from "../UI/Button/Button";
import Flex from "../UI/Layout/Flex";
import Box from "../UI/Layout/Box";

const Login = ({ loginLink }) => {
  return (
    <Flex flexDirection={("row", null, null, "row")}>
      <Box width="100%">
        <Button type="number">
          <a href={loginLink} targe="_self">
            <span>Login with Strava</span>
          </a>
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
