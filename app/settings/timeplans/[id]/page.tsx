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
import { createTimePlanDialogueContent } from "../../utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BackButton from "@/app/ui/BackButton";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import Input from "@/app/ui/Input";

function Page() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("0");

  const tableActions = <Link href="/settings/timeplans/1">Configure</Link>;

  const headers = ["Namn", "Actions"]; // Column headers expected in the data object
  const data = [
    {
      Namn: "Åk4",
      Actions: tableActions,
    },
    {
      Namn: "Åk5",
      Actions: tableActions,
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value === "" ||
      isNaN(Number(e.target.value)) ||
      Number(e.target.value) < 0
    ) {
      setValue("0");
      return;
    }
    setValue(e.target.value);
  };
  return (
    <PageWrapper>
      <DialogPopup
        open={open}
        handleClose={handleClose}
        dialogueContent={createTimePlanDialogueContent}
      />
      <HeaderWrapper>
        <BackButton path="/settings/timeplans/list" />
      </HeaderWrapper>
      <ContentWrapper>
        <Header>Åk 4</Header>
        <LessonInputsWrapper>
          <LessonInputWrapper>
            <Label>Matte (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Svenska (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Bild (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Engelska (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Engelska (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Engelska (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Engelska (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Engelska (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Engelska (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Engelska (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Engelska (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Engelska (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Engelska (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <LessonInputWrapper>
            <Label>Engelska (minuter/vecka)</Label>
            <Input type="number" value={value} onChange={handleChange} />
          </LessonInputWrapper>
          <SummaryWrapper>
            <Label>Total: </Label>
            <Text>1560</Text>
          </SummaryWrapper>
        </LessonInputsWrapper>
        <ActionsWrapper>
          <Button
            key="Save"
            text="Save"
            startIcon={<PersonAddAltOutlinedIcon />}
            handleClick={() => setOpen(true)}
          />
          <Button
            key="Delete"
            text="Delete"
            color="error"
            startIcon={<DeleteForeverOutlinedIcon />}
            handleClick={() => setOpen(true)}
          />
        </ActionsWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default Page;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Header = styled.h1`
  font-size: 2rem;
  color: var(--primary-dark);
  align-self: flex-start;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 80%;
`;
// Inputs will be in 4 columns max with grid
const LessonInputsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
  background-color: var(--primary-light-transparent);
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LessonInputWrapper = styled.div`
  display: grid;
  grid-template-columns: auto; /* First column for labels, second for inputs */
  grid-gap: 10px; /* Space between rows and columns */
  align-items: center; /* Align items vertically */
  margin-bottom: 1rem;
`;

const SummaryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Text = styled.p`
  font-weight: bold;
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: flex-end;
`;

// const LessonInputsWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   width: 100%;
// `;

// const Label = styled.label`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const LessonInputWrapper = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `;

