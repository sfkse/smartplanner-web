"use client";

import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import styled from "styled-components";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DialogPopup from "@/app/(authenticated)/ui/DialogPopup";
import { teacherCreateDialogueContent } from "./utils";
import Button from "@/app/(authenticated)/ui/Button";
import Table from "@/app/(authenticated)/ui/Table";
import { useFetchUsers } from "./useFetchUsers";
import { useCreateUser } from "./useCreateUser";
import Loading from "../../loading";
import { User } from "./types";

function Page() {
  const [open, setOpen] = React.useState(false);
  const { users, error, isPending } = useFetchUsers();
  const {
    mutate,
    error: createError,
    isPending: createPending,
  } = useCreateUser();

  const userFilters = ["Activated", "Invited", "Administrator"];

  const tableActions = [
    {
      text: "Edit",
      icon: <EditOutlinedIcon />,
      callback: () => console.log("Edit"),
    },
    {
      text: "Delete",
      color: "error",
      icon: <DeleteForeverOutlinedIcon />,
      callback: () => console.log("Delete"),
    },
  ];

  const tableData = users.map((user: User) => {
    return {
      Namn: user.firstname + " " + user.lastname,
      Rollen: user.role === 0 ? "Lärare" : "Administator",
      Ämne: user.profession,
      Status: user.active ? "Activated" : "Invited",
      Actions: tableActions,
    };
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson);
    mutate(formJson as User);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (createError) {
    return <div>Error: {createError.message}</div>;
  }

  return (
    <Loading isLoading={isPending || createPending}>
      <PageHeader>
        <DialogPopup
          open={open}
          handleClose={handleClose}
          dialogueContent={teacherCreateDialogueContent}
          submit={handleSubmit}
        />
        <OptionsWrapper>
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
        </OptionsWrapper>
        <Table>
          <Table.Header>
            <Table.TableHeaderRow>
              <Table.Head
                headerElements={["Namn", "Rollen", "Ämne", "Status", "Actions"]}
              />
            </Table.TableHeaderRow>
          </Table.Header>
          <Table.Body>
            <Table.TableBodyRow tableData={tableData} />
          </Table.Body>
        </Table>
      </PageHeader>
    </Loading>
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

