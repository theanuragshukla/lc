import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ApplyPagination from "../component/applyPagination";
import StandingTable from "../component/standingTable";

const BASE_URL = "http://localhost:8080";

const processUsers = (users) => {
  for(let i = 0;i < users.length;i++){
    users[i].solved = users[i].solved.split(":");
    users[i].timestamp = users[i].timestamp.split(":");
  }

  return users;
}

function Standing() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [totalPages, setTotalPages] = useState(1000);
  const [isCommonStanding, setIsCommnonStanding] = useState(true);
  const [isFriendsStanding, setIsFriendsStanding] = useState(false);

  const changePage = (page) => {
    setPage(page);
  };

  const getStanding = async () => {
    try {
      const response = await fetch(`${BASE_URL}/standing/page/${page}`);
      const { data } = await response.json();
      setUsers(processUsers(data.users));

      setIsCommnonStanding(true);
      setIsFriendsStanding(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getFriendsStanding = async () => {
    try {
      const response = await fetch(`${BASE_URL}/standing/friends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          friends,
        })
      });

      const { data } = await response.json();
      setUsers(processUsers(data.friends));
      
      setIsCommnonStanding(false);
      setIsFriendsStanding(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("friends")){
      setFriends(localStorage.getItem("friends").split(","));
    }  

    getStanding();
  }, [page]);

  return (
    <Box
      py={6}
      mb={8}
      px={4}
      width={{ xs: "100%", sm: "600px", md: "900px", lg: "1000px" }}
      margin={"16px auto"}
    >
      <Stack justifyContent={"center"} gap={2} direction={"row"} mb={4}>
        <Button
          variant="contained"
          onClick={() => {
            getStanding();
          }}
        >
          COMMON STANDINGS
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            getFriendsStanding();
          }}
        >
          FRIENDS STANDINGS
        </Button>
      </Stack>

      <Box mb={8}>
        <StandingTable users={users} />
      </Box>

      {isCommonStanding && (
        <ApplyPagination
          page={page}
          totalPages={totalPages}
          changePage={changePage}
          CHANGE_LIMIT_ALLOWED={false}
        />
      )}
    </Box>
  );
}

export default Standing;
