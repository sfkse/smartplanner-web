"use client";

import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function Page() {
  const userFilters = ["Activated", "Invited", "Administrator"];
  return (
    <PageHeader>
      <OptionsWrapper>
        <FilterWrapper>
          <Autocomplete
            disablePortal
            options={userFilters}
            sx={{ width: 150 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Select filter..." />
            )}
          />
        </FilterWrapper>
        <ButtonsWrapper>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            startIcon={<PersonAddAltOutlinedIcon />}
          >
            <span style={{ paddingTop: "3px" }}>LÄGG TILL LÄRARE</span>
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            style={{ display: "flex", alignItems: "center" }}
            startIcon={<GroupAddOutlinedIcon />}
          >
            <span style={{ paddingTop: "3px" }}>IMPORTERA LÄRARE</span>
          </Button>
        </ButtonsWrapper>
      </OptionsWrapper>
      {/* <UserListHeader>
        <UserListHeaderItem>Username</UserListHeaderItem>
        <UserListHeaderItem>Email</UserListHeaderItem>
        <UserListHeaderItem>Role</UserListHeaderItem>
        <UserListHeaderItem>Status</UserListHeaderItem>
        <UserListHeaderItem>Actions</UserListHeaderItem>
      </UserListHeader>
      <UserList>
        <UserListItem>
          <UserListCell>John Doe</UserListCell>
          <UserListCell>  [email protected]</UserListCell>
          <UserListCell>Administrator</UserListCell>
          <UserListCell>Activated</UserListCell>
          <UserListCell>
            <Button variant="outlined" size="small" color="primary">
              Edit
            </Button>
            <Button variant="outlined" size="small" color="error">
              Delete
            </Button>
          </UserListCell>
        </UserListItem>
      </UserList> */}
      {/* Turn this Userlistheader and userlist into a table component */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHaed>Namn</TableHaed>
            <TableHaed>Email</TableHaed>
            <TableHaed>Role</TableHaed>
            <TableHaed>Profession</TableHaed>
            <TableHaed>Status</TableHaed>
            <TableHaed>Actions</TableHaed>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableData>John Doe</TableData>
            <TableData> [email protected]</TableData>
            <TableData>Administrator</TableData>
            <TableData>Math</TableData>
            <TableData>
              <Chip label="Activated" color="success" size="small" />
            </TableData>
            <TableData>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<EditOutlinedIcon />}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                style={{ marginLeft: 8 }}
                startIcon={<DeleteForeverOutlinedIcon />}
              >
                Delete
              </Button>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>John Doe</TableData>
            <TableData> [email protected]</TableData>
            <TableData>Administrator</TableData>
            <TableData>Math</TableData>
            <TableData>
              <Chip label="Invited" color="warning" size="small" />
            </TableData>
            <TableData>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<EditOutlinedIcon />}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                style={{ marginLeft: 8 }}
                startIcon={<DeleteForeverOutlinedIcon />}
              >
                Delete
              </Button>
            </TableData>
          </TableRow>
        </TableBody>
      </Table>
    </PageHeader>
  );
}

export default Page;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
`;

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.thead`
  background-color: var(--primary-light-transparent);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--primary-light-transparent);
`;

const TableHaed = styled.th`
  padding: 1rem;
  text-align: left;
`;

const TableBody = styled.tbody``;

const TableData = styled.td`
  padding: 1rem;
`;

