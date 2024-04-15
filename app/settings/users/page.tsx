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
import DialogPopup from "@/app/ui/DialogPopup";
import { teacherCreateDialogueContent } from "./utils";
import Button from "@/app/ui/Button";
import Table from "@/app/ui/Table";

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
  const headers = ["Namn", "Rollen", "Ämne", "Status", "Actions"]; // Column headers expected in the data object
  const data = [
    {
      Namn: "Alice",
      Rollen: "Teacher",
      Ämne: "Math",
      Status: "Active",
      Actions: tableActions,
    },
    {
      Namn: "Bob",
      Rollen: "Teacher",
      Ämne: "Math",
      Status: "Active",
      Actions: tableActions,
    },
    {
      Namn: "Chris",
      Rollen: "Teacher",
      Ämne: "Math",
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
            text="LÄGG TILL LÄRARE"
            startIcon={<PersonAddAltOutlinedIcon />}
            handleClick={() => setOpen(true)}
          />

          <Button
            text="IMPORTERA LÄRARE"
            startIcon={<GroupAddOutlinedIcon />}
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
          <Table.TableBodyRow headerElements={headers} tableData={data} />
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

