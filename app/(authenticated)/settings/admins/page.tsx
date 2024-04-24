"use client";

import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DialogPopup from "@/app/(authenticated)/ui/DialogPopup";
import { teacherCreateDialogueContent } from "./utils";
import Button from "@/app/(authenticated)/ui/Button";
import Table from "@/app/(authenticated)/ui/Table";

function Page() {
  const [open, setOpen] = React.useState(false);
  const userFilters = ["Activated", "Invited", "Administrator"];

  const tableActions = [
    <Button
      key="Edit"
      text="Edit"
      startIcon={<EditOutlinedIcon />}
      handleClick={() => setOpen(true)}
    />,
    <Button
      key="Delete"
      text="Delete"
      color="error"
      startIcon={<DeleteForeverOutlinedIcon />}
      handleClick={() => setOpen(true)}
    />,
  ];
  const headers = ["Namn", "Rollen", "Epost", "Status", "Actions"]; // Column headers expected in the data object
  const data = [
    {
      Namn: "Alice",
      Rollen: "Admin",
      Epost: "test@gmail.com",
      Status: "Active",
      Actions: tableActions,
    },
    {
      Namn: "Bob",
      Rollen: "Admin",
      Epost: "test@gmail.com",
      Status: "Active",
      Actions: tableActions,
    },
    {
      Namn: "Chris",
      Rollen: "Admin",
      Epost: "test@gmail.com",
      Status: "Active",
      Actions: tableActions,
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PageHeader>
      <DialogPopup
        open={open}
        handleClose={handleClose}
        dialogueContent={teacherCreateDialogueContent}
        submit={() => {}}
      />
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
            text="LÄGG TILL ADMIN"
            startIcon={<PersonAddAltOutlinedIcon />}
            handleClick={() => setOpen(true)}
          />
        </ButtonsWrapper>
      </OptionsWrapper>
      <Table>
        <Table.Header>
          <Table.TableHeaderRow>
            <Table.Head headerElements={headers} />
          </Table.TableHeaderRow>
        </Table.Header>
        <Table.Body>
          <Table.TableBodyRow tableData={data} />
        </Table.Body>
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

