import React, { useEffect, useState } from "react";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { map, size } from "lodash";
import { CircularProgress } from "@mui/material";
import { UserItem } from "../UserItem";

const userController = new User();

export function ListUsers(props) {
  const { userActive, reload } = props;
  const [users, setUsers] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setUsers(null);
        const response = await userController.getUsers(accessToken, userActive);
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [userActive, accessToken, reload]);

  if (!users) {
    return <CircularProgress />;
  }
  if (size(users) === 0) {
    return "Sin usuarios";
  }

  return map(users, (user) => <UserItem key={user._id} user={user} />);
}
