"use client";

import DialogPopup from "@/app/ui/DialogPopup";
import styled from "styled-components";
import { useState } from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Button from "@/app/ui/Button";
import Table from "@/app/ui/Table";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Autocomplete, TextField } from "@mui/material";
import { createTimePlanDialogueContent } from "../utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const userFilters = ["24/25"];

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

  const headers = ["Timplan", "Klass", "Actions"]; // Column headers expected in the data object
  const data = [
    {
      Klassnamn: "5A",
      Timplan: <Link href="/settings/timeplans/create">Create</Link>,
      Actions: tableActions,
    },
    { Klassnamn: "5B", Timplan: "asd", Actions: tableActions },
    { Klassnamn: "5C", Timplan: "asd", Actions: tableActions },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PageHeader>
      <DialogPopup
        open={open}
        handleClose={handleClose}
        dialogueContent={createTimePlanDialogueContent}
      />
      <OptionsWrapper>
        {/* <FilterWrapper>
          <Autocomplete
            disablePortal
            options={userFilters}
            sx={{ width: 150 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Välj årskurs..." />
            )}
          />
        </FilterWrapper> */}
        <ButtonsWrapper>
          <Button
            text="TIMPLANER"
            startIcon={<PersonAddAltOutlinedIcon />}
            handleClick={() => router.push("/settings/timeplans/list")}
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

