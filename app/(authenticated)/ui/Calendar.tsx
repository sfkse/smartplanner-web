"use client";

import React, { useEffect, useState } from "react";
import "./index.css";
import styled from "styled-components";
import Button from "./Button";
import { useFetchRequests } from "../(adminPages)/admin/plan/overview/useFetchRequests";
import { useCreateRequest } from "../(userPages)/request/useCreateRequest";
import { useFetchAuthUser } from "../hooks/auth/useFetchAuthUser";
import { TDraggable, TDraggables } from "../(userPages)/request/types";
import {
  CELL_HEIGHT,
  calculateDimensions,
  calendaHours,
  calendarDays,
  getCell,
} from "../utils/calendar";
import Loading from "@/app/(authpages)/loading";

const WeekViewCalendar = () => {
  const { authUser, isPending: isAuthUserPending } = useFetchAuthUser();
  const { requests, isPending: isRequestPending, error } = useFetchRequests();
  console.log(requests);
  const {
    mutate,
    error: createError,
    isPending: createPending,
  } = useCreateRequest();
  const [draggables, setDraggables] = useState<TDraggables>([]);
  const [modal, setModal] = useState({
    open: false,
    type: "",
    content: {
      requestID: "",
      title: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      description: "",
      userID: "",
      properties: {
        top: 0,
        left: 0,
        height: 0,
        width: 0,
      },
    },
  });

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
            CELL_HEIGHT,
            Math.round(height / CELL_HEIGHT) * CELL_HEIGHT - 3
          )}px`;
        };

        const stopResize = () => {
          document.removeEventListener("mousemove", onMouseResize);
        };
      });

      window.addEventListener("resize", handleResize);

      function handleResize() {
        // Get the width of the cell
      }
    });

    return () => {
      draggableElements.forEach((draggable: any) => {
        draggable.removeEventListener("mousedown", (e: MouseEvent) => {
          e.preventDefault();
        });
      });
    };
  }, [draggables]);
  console.log(draggables);
  // const calculateTop = (hourIndex) => {
  //   // Calculate and return new top position based on hourIndex
  //   return hourIndex * 40; // Example calculation
  // };

  // const calculateLeft = (dayIndex) => {
  //   // Calculate and return new left position based on dayIndex
  //   const cellWidth =
  //     document.querySelector(".calendar").offsetWidth / days.length;
  //   return dayIndex * cellWidth;
  // };

  // function getWeekNumbers() {
  //   const today = new Date();
  //   const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  //   const pastDaysOfYear =
  //     (today.valueOf() - firstDayOfYear.valueOf()) / 86400000;
  //   return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  // }
  // console.log(getWeekNumbers());

  const handleDoubleClick = () => {
    setModal({ ...modal, open: true, type: "create" });
  };

  // const openPopup = () => {
  //   setModal({ ...modal, open: true });
  // };

  const handleSubmit = () => {
    const data = modal.content;
    // Check if the startTime is before the endTime
    // if (data.startTime > data.endTime) {
    //   alert("Start time must be before end time");
    //   return;
    // }
    // Check if the startTime is valid (between 08:00 and 17:00)
    // if (data.startTime < "08:00" || data.startTime > "17:00") {
    //   alert("Start time must be between 08:00 and 17:00");
    //   return;
    // }
    // Check if the endTime is valid (between 08:00 and 17:00)
    // if (data.endTime < "08:00" || data.endTime > "17:00") {
    //   alert("End time must be between 08:00 and 17:00");
    //   return;
    // }

    const cellToBeCreated = getCell(data.startTime, data.startDate);

    const { left, top, height } = calculateDimensions(
      cellToBeCreated,
      data.startTime,
      data.endTime
    );

    console.log(data);
    const newDraggable = {
      // day: dayIndex,
      // hour: hourIndex,
      // top: top,
      // left: left,
      // height: height,
      // width: cellToBeCreated[0].getBoundingClientRect().width,
      // isDataUpdated: false,
      // data: {
      //   title: data.title,
      //   startDate: data.startDate,
      //   endDate: data.endDate,
      //   startTime: data.startTime,
      //   endTime: data.endTime,
      //   description: data.description,
      //   userID: authUser.idusers,
      // },
      title: data.title,
      description: data.description,
      startTime: data.startTime,
      endTime: data.endTime,
      userID: authUser.idusers,
      startDate: data.startDate,
      endDate: data.endDate,
      properties: {
        top,
        left,
        height,
        width: cellToBeCreated[0].getBoundingClientRect().width,
      },
    };

    setModal({ ...modal, open: false, type: "" });
    mutate(newDraggable);
  };

  const handleUpdate = (draggable: TDraggable) => {
    setModal({
      open: true,
      type: "update",
      content: {
        requestID: draggable.requestID,
        title: draggable.title,
        startDate: draggable.startDate,
        endDate: draggable.endDate,
        startTime: draggable.startTime,
        endTime: draggable.endTime,
        description: draggable.description,
        userID: draggable.userID,
        properties: {
          top: draggable.properties.top,
          left: draggable.properties.left,
          height: draggable.properties.height,
          width: draggable.properties.width,
        },
      },
    });

    console.log(getCell(draggable.startTime, draggable.startDate));
  };

  return (
    <Loading isLoading={isRequestPending || createPending}>
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
                        title: e.target.value,
                      },
                    })
                  }
                  value={modal.content.title}
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
                          startDate: e.target.value,
                        },
                      })
                    }
                    value={modal.content.startDate}
                  />
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    onChange={(e) =>
                      setModal({
                        ...modal,
                        content: {
                          ...modal.content,
                          startTime: e.target.value,
                        },
                      })
                    }
                    value={modal.content.startTime}
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
                          endDate: e.target.value,
                        },
                      })
                    }
                    value={modal.content.endDate}
                  />
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    onChange={(e) =>
                      setModal({
                        ...modal,
                        content: {
                          ...modal.content,
                          endTime: e.target.value,
                        },
                      })
                    }
                    value={modal.content.endTime}
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
                        description: e.target.value,
                      },
                    })
                  }
                  value={modal.content.description}
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

      <Calendar className="calendar">
        <HeaderRow>
          <CornerCell></CornerCell>
          {calendarDays.map((day) => (
            <HeaderCell className={`header-${day}`} key={day}>
              {day}
            </HeaderCell>
          ))}
        </HeaderRow>
        {calendaHours.map((hour) => (
          <Row key={hour}>
            <TimeCell hour={hour} className={`header-${hour}`}>
              {hour.split(":")[1] === "00" ? hour : ""}
            </TimeCell>
            {calendarDays.map((day) => (
              <Cell
                className={`cell-${day}-${hour}`}
                key={day + hour}
                height={CELL_HEIGHT}
                onDoubleClick={handleDoubleClick}
              ></Cell>
            ))}
          </Row>
        ))}
        {draggables.length > 0 &&
          draggables.map((draggable: TDraggable) => (
            <Draggable
              key={draggable.requestID}
              height={draggable.properties.height}
              top={draggable.properties.top}
              width={draggable.properties.width}
              left={draggable.properties.left}
              className="draggable"
              onDoubleClick={() => handleUpdate(draggable)}
            >
              <DraggableContent>
                <DraggableTitle>{draggable.title}</DraggableTitle>
                <DraggableTime>
                  {draggable.startTime} - {draggable.endTime}
                </DraggableTime>
              </DraggableContent>
              <ResizeWrapper className="resize">
                <Resizer />
              </ResizeWrapper>
            </Draggable>
          ))}
      </Calendar>
    </Loading>
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
  /* padding: 8px; */
  text-align: center;
  position: relative;
  background-color: #f0f0f0;
  font-weight: bold;
`;

const Cell = styled.div<{ height?: number }>`
  border: 1px solid #ccc;
  border-top: none;
  padding: 8px;
  text-align: center;
  position: relative;
  height: ${(props) => `${props.height}px`};
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
  overflow: hidden;
`;

const DraggableContent = styled.div`
  padding: 5px;
`;

const DraggableTitle = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

const DraggableTime = styled.p`
  font-size: 0.8rem;
`;

const ResizeWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 5px;
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

