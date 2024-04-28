"use client";

import React, { use, useEffect, useState } from "react";
import "./index.css";
import styled from "styled-components";
import Button from "./Button";
import { useFetchRequests } from "../(adminPages)/admin/plan/overview/useFetchRequests";
import { useCreateRequest } from "../(userPages)/request/useCreateRequest";
import { useFetchAuthUser } from "../hooks/auth/useFetchAuthUser";
import { Draggable, Draggables } from "../(userPages)/request/types";

const WeekViewCalendar = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = [
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
  ];
  const { authUser, isPending: isAuthUserPending } = useFetchAuthUser();
  const { requests, isPending: isRequestPending, error } = useFetchRequests();

  const {
    mutate,
    error: createError,
    isPending: createPending,
  } = useCreateRequest();
  const [draggables, setDraggables] = useState<Draggables>([]);
  const [modal, setModal] = useState({
    open: false,
    content: {
      day: 0,
      hour: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: 80,
      width: 200,
      isDataUpdated: false,
      data: {
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        description: "",
        userID: "",
      },
    } as Draggable,
  });

  const handleDoubleClick = () => {
    setModal({ ...modal, open: true });
  };

  // const openPopup = () => {
  //   setModal({ ...modal, open: true });
  // };

  const handleSubmit = () => {
    const data = modal.content;
    console.log(data);
    // Check if the startTime is before the endTime
    // if (data.data.startTime > data.data.endTime) {
    //   alert("Start time must be before end time");
    //   return;
    // }
    // Check if the startTime is valid (between 08:00 and 17:00)
    // if (data.data.startTime < "08:00" || data.data.startTime > "17:00") {
    //   alert("Start time must be between 08:00 and 17:00");
    //   return;
    // }
    // Check if the endTime is valid (between 08:00 and 17:00)
    // if (data.data.endTime < "08:00" || data.data.endTime > "17:00") {
    //   alert("End time must be between 08:00 and 17:00");
    //   return;
    // }
    // Find the index of the startTIme in the hours array.
    const hourParts = data.data.startTime.split(":")[0].toString() + ":00";
    const hourIndex = hours.findIndex((h) => h === hourParts);
    // data.day is in the format of 2024-10-12. We need to find the day of the week.
    const dayIndex = new Date(data.data.startDate).getDay();
    const day = days[dayIndex - 1];

    const cellToBeCreated = document.getElementsByClassName(
      `cell-${day}-${hourParts}`
    ) as HTMLCollectionOf<HTMLElement>;

    // Place the cell in the correct position
    const top = cellToBeCreated[0].offsetTop;
    const left = cellToBeCreated[0].offsetLeft;
    // Calculate the height of the cell. Default height is 80px. We need to calculate the difference between the start and end time. Each hour is 80px. Each 15 minutes is 20px. Each 5 minutes is 10px.
    const startTime = data.data.startTime.split(":");
    const endTime = data.data.endTime.split(":");
    const startHour = parseInt(startTime[0]);
    const endHour = parseInt(endTime[0]);
    const startMinute = parseInt(startTime[1]);
    const endMinute = parseInt(endTime[1]);
    let hourDifference = endHour - startHour;
    let minuteDifference = endMinute - startMinute;
    if (minuteDifference < 0) {
      minuteDifference = 60 + minuteDifference;
      hourDifference -= 1;
    }
    const height = hourDifference * 160 + (minuteDifference / 15) * 40;

    console.log(hourDifference, minuteDifference, height);
    const newDraggable = {
      day: dayIndex,
      hour: hourIndex,
      top: top,
      left: left,
      height: height,
      width: cellToBeCreated[0].getBoundingClientRect().width,
      isDataUpdated: false,
      data: {
        title: data.data.title,
        startDate: data.data.startDate,
        endDate: data.data.endDate,
        startTime: data.data.startTime,
        endTime: data.data.endTime,
        description: data.data.description,
        userID: authUser.idusers,
      },
    };

    setModal({ ...modal, open: false });
    mutate(newDraggable);
  };

  useEffect(() => {
    if (requests.length > 0) {
      setDraggables(requests);
    }
  }, [requests.length]);

  useEffect(() => {
    const draggableElements = document.querySelectorAll(".draggable");
    draggableElements.forEach((draggable: any) => {
      draggable.addEventListener("mousedown", (e: MouseEvent) => {
        e.preventDefault();

        const resizer = draggable.querySelector(".resize") as HTMLElement;
        resizer.addEventListener("mousedown", (e) => {
          e.preventDefault();
          e.stopPropagation();
          document.addEventListener("mousemove", onMouseResize);
          document.addEventListener("mouseup", stopResize, { once: true });
        });

        const onMouseResize = (event: MouseEvent) => {
          const height = event.clientY - draggable.getBoundingClientRect().top;
          // Snap resize to grid (40px per slot)
          draggable.style.height = `${Math.max(
            40,
            Math.round(height / 40) * 40 - 10
          )}px`;
        };

        const stopResize = () => {
          document.removeEventListener("mousemove", onMouseResize);
        };
      });
    });
  }, [draggables]);
  console.log(draggables);
  return (
    <>
      {modal.open && (
        <Modal>
          <ContentWrapper>
            <Title>Event Details</Title>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  onChange={(e) =>
                    setModal({
                      ...modal,
                      content: {
                        ...modal.content,
                        data: { ...modal.content.data, title: e.target.value },
                      },
                    })
                  }
                  value={modal.content.data.title}
                />
              </InputGroup>
              <InputGroup>
                <DateTimeWrapper>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    onChange={(e) =>
                      setModal({
                        ...modal,
                        content: {
                          ...modal.content,
                          data: {
                            ...modal.content.data,
                            startDate: e.target.value,
                          },
                        },
                      })
                    }
                    value={modal.content.data.startDate}
                  />
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    onChange={(e) =>
                      setModal({
                        ...modal,
                        content: {
                          ...modal.content,
                          data: {
                            ...modal.content.data,
                            startTime: e.target.value,
                          },
                        },
                      })
                    }
                    value={modal.content.data.startTime}
                  />
                </DateTimeWrapper>
              </InputGroup>
              <InputGroup>
                <DateTimeWrapper>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    onChange={(e) =>
                      setModal({
                        ...modal,
                        content: {
                          ...modal.content,
                          data: {
                            ...modal.content.data,
                            endDate: e.target.value,
                          },
                        },
                      })
                    }
                    value={modal.content.data.endDate}
                  />
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    onChange={(e) =>
                      setModal({
                        ...modal,
                        content: {
                          ...modal.content,
                          data: {
                            ...modal.content.data,
                            endTime: e.target.value,
                          },
                        },
                      })
                    }
                    value={modal.content.data.endTime}
                  />
                </DateTimeWrapper>
              </InputGroup>
              <InputGroup>
                <Label>Description</Label>
                <Textarea
                  onChange={(e) =>
                    setModal({
                      ...modal,
                      content: {
                        ...modal.content,
                        data: {
                          ...modal.content.data,
                          description: e.target.value,
                        },
                      },
                    })
                  }
                  value={modal.content.data.description}
                />
              </InputGroup>
              <ButtonWrapper>
                <Button
                  text="Cancel"
                  handleClick={() => setModal({ ...modal, open: false })}
                  color="primary"
                  type="button"
                />
                <Button
                  text="Save"
                  handleClick={handleSubmit}
                  color="primary"
                  type="submit"
                  variant="contained"
                />
              </ButtonWrapper>
            </Form>
          </ContentWrapper>
        </Modal>
      )}
      <Calendar>
        <HeaderRow>
          <CornerCell></CornerCell>
          {days.map((day) => (
            <HeaderCell className={`header-${day}`} key={day}>
              {day}
            </HeaderCell>
          ))}
        </HeaderRow>
        {hours.map((hour) => (
          <Row key={hour}>
            <TimeCell hour={hour} className={`header-${hour}`}>
              {hour.split(":")[1] === "00" ? hour : ""}
            </TimeCell>
            {days.map((day) => (
              <Cell
                className={`cell-${day}-${hour}`}
                key={day + hour}
                onDoubleClick={handleDoubleClick}
              ></Cell>
            ))}
          </Row>
        ))}
        {draggables.length > 0 &&
          draggables.map((draggable, index) => (
            <Draggable
              key={index}
              height={draggable.properties.height}
              top={draggable.properties.top}
              width={draggable.properties.width}
              left={draggable.properties.left}
              className="draggable"
            >
              <DraggableContent>
                <strong>{draggable.title}</strong>
                <br />
                {draggable.start} - {draggable.end}
              </DraggableContent>
              <ResizeWrapper className="resize">
                <Resizer />
              </ResizeWrapper>
            </Draggable>
          ))}
      </Calendar>
    </>
  );
};

export default WeekViewCalendar;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ContentWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40%;
`;

const Title = styled.h2``;

const Form = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateTimeWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  height: 100px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

// Calendar styles
const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  width: 100%;
  position: relative;
  overflow-x: auto;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(5, 1fr);
`;

const CornerCell = styled.div`
  border: 1px solid #ccc;
  padding: 8px;
  background-color: #f0f0f0;
`;

const HeaderCell = styled.div`
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
  position: relative;
  background-color: #f0f0f0;
  font-weight: bold;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(5, 1fr);
`;

const TimeCell = styled.div<{ hour: string }>`
  border-top: ${(props) =>
    props.hour.split(":")[1] === "00" || props.hour.split(":")[1] === "30"
      ? "1px solid #ccc"
      : "none"};
  padding: 8px;
  text-align: center;
  position: relative;
  background-color: #f0f0f0;
  font-weight: bold;
`;

const Cell = styled.div`
  border: 1px solid #ccc;
  border-top: none;
  padding: 8px;
  text-align: center;
  position: relative;
  height: 40px;
`;

const Draggable = styled.div<{
  height: number;
  top: number;
  width: number;
  left: number;
}>`
  position: absolute;
  cursor: pointer;
  z-index: 10;
  width: 200px;
  background-color: var(--primary-extra-light);
  height: ${(props) => `${props.height - 5}px`};
  top: ${(props) => `${props.top + 3}px`};
  width: ${(props) => `${props.width - 10}px`};
  left: ${(props) => `${props.left + 5}px`};
`;

const DraggableContent = styled.div`
  padding: 10px;
`;

const ResizeWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 10px;
  z-index: 10;
  background-color: var(--primary-light);
  cursor: ns-resize;
`;
const Resizer = styled.div`
  /* height: 10px;
  background-color: darkblue;
  cursor: ns-resize;
  position: absolute; */
  /* position: absolute;
  bottom: 0;
  width: 100%; */
`;

