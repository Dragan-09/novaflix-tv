import React, { useState } from "react";
import {
  Box,
  H4,
  FormGroup,
  Label,
  Input,
  Button,
} from "@adminjs/design-system";
import { ActionProps } from "adminjs";
import axios from "axios";

function Credentials(props) {
  const { record } = props;
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const sendCredentials = async () => {
    const send = await axios.post(
      `${process.env.BACKEND_URL}/api/plan/active/${record.params.user}/${record.params.id}/`
    );
  };

  return (
    <Box flex>
      <Box variant="white" width={1} boxShadow="card" mr="xxl" flexShrink={0}>
        <H4>Send Credentials.</H4>
        <form action="">
          <FormGroup>
            <Label required>Username</Label>
            <Input
              placeholder="IP Tv - Account Username"
              // onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label required>Password</Label>
            <Input
              placeholder="IP Tv - Account Password"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button
            variant={"contained"}
            color={"primary"}
            size={"lg"}
            // onClick={sendCredentials}
          >
            Send
          </Button>
        </form>
      </Box>
      <Box>{/* <Box overflowX="auto">{JSON.stringify(record)}</Box> */}</Box>
    </Box>
  );
}

export default Credentials;
