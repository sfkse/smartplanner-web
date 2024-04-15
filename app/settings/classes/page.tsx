"use client";

import DialogPopup from "@/app/ui/DialogPopup";
import styled from "styled-components";
import { createClassDialogueContent } from "../utils";
import { useState } from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Button from "@/app/ui/Button";
import Table from "@/app/ui/Table";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Autocomplete, TextField } from "@mui/material";

function Page() {
  const [open, setOpen] = useState(false);

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
  const headers = ["Klassnamn", "Actions"]; // Column headers expected in the data object
  const data = [
    { Klassnamn: "5A", Actions: tableActions },
    { Klassnamn: "5B", Actions: tableActions },
    { Klassnamn: "5C", Actions: tableActions },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PageHeader>
      <DialogPopup
        open={open}
        handleClose={handleClose}
        dialogueContent={createClassDialogueContent}
      />
      <OptionsWrapper>
        <ButtonsWrapper>
          <Button
            text="LÄGG TILL KLASSE"
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
