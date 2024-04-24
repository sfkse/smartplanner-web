"use client";

import DialogPopup from "@/app/(authenticated)/ui/DialogPopup";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Button from "@/app/(authenticated)/ui/Button";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { createTimePlanDialogueContent } from "../../utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BackButton from "@/app/(authenticated)/ui/BackButton";
import Input from "@/app/(authenticated)/ui/Input";
import { useFetchSingleClassTimeplans } from "../useFetchSingleClassTimeplan";
import { ClassTimeplan } from "../types";
import { useFetchLessons } from "../../lessons/useFetchLessons";
import { Lesson } from "../../lessons/types";
import { useUpdateClassTimeplan } from "../useUpdateClassTimeplan";
import Loading from "@/app/(authenticated)/loading";
import { toast } from "react-toastify";
import { time } from "console";

function Page() {
  const [open, setOpen] = useState(false);
  const [renderedTimes, setRenderedTimes] = useState([
    { lesson: "", minutes: 0 },
  ]);
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const { singleClassTimeplans, error, isPending } =
    useFetchSingleClassTimeplans(id as ClassTimeplan["idclasstimeplans"]);

  const {
    mutate,
    isPending: isPendingUpdate,
    isSuccess,
  } = useUpdateClassTimeplan();

  const {
    lessons,
    error: errorLessons,
    isPending: isPendingLessons,
  } = useFetchLessons();

  const sumMinutes = useMemo(() => {
    return renderedTimes.reduce((acc, curr) => acc + curr.minutes, 0);
  }, [renderedTimes]);

  useEffect(() => {
    if (lessons.length && singleClassTimeplans.length > 0) {
      const initialTimes = lessons.map((lesson: Lesson) => ({
        lesson: lesson.name,
        minutes:
          (singleClassTimeplans[0].minutes &&
            JSON.parse(singleClassTimeplans[0].minutes).find(
              (time: any) => time[lesson.name]
            )?.[lesson.name]) ||
          0,
      }));

      setRenderedTimes(initialTimes);
    }
  }, [lessons, singleClassTimeplans]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    lessonName: string
  ) => {
    const newMinutes = parseInt(e.target.value);
    setRenderedTimes((prevTimes) =>
      prevTimes.map((time) => {
        if (time.lesson === lessonName) {
          return { ...time, minutes: newMinutes };
        }
        return time;
      })
    );
  };

  const handleSaveMinutes = () => {
    console.log(renderedTimes);

    const data: ClassTimeplan = {
      idclasstimeplans: singleClassTimeplans[0].idclasstimeplans,
      idclasses: singleClassTimeplans[0].idclasses,
      timeplanname: singleClassTimeplans[0].timeplanname,
      minutes: [
        ...renderedTimes.map((time) => ({ [time.lesson]: time.minutes })),
      ],
    };

    mutate(data);
  };

  return (
    <Loading isLoading={isPending || isPendingLessons || isPendingUpdate}>
      <PageWrapper>
        <DialogPopup
          open={open}
          handleClose={handleClose}
          dialogueContent={createTimePlanDialogueContent}
          submit={() => {}}
        />
        <HeaderWrapper>
          <BackButton path="/admin/settings/timeplans" />
        </HeaderWrapper>
        <ContentWrapper>
          <Header>{singleClassTimeplans[0]?.timeplanname}</Header>
          <LessonInputsWrapper>
            {renderedTimes.map((value, index) => (
              <LessonInputWrapper key={index}>
                <Label>{value.lesson} (minuter/vecka)</Label>
                <Input
                  type="number"
                  value={value.minutes}
                  onChange={(e) => handleChange(e, value.lesson)}
                />
              </LessonInputWrapper>
            ))}
            <SummaryWrapper>
              <Label>Total: </Label>
              <Text>{sumMinutes}</Text>
            </SummaryWrapper>
          </LessonInputsWrapper>
          <ActionsWrapper>
            <Button
              key="Save"
              text="Save"
              startIcon={<PersonAddAltOutlinedIcon />}
              handleClick={handleSaveMinutes}
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
    </Loading>
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

