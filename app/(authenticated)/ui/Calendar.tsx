"use client";

import "./index.css";
import { useState, useRef } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
  Resize,
  DragAndDrop,
  DragEventArgs,
} from "@syncfusion/ej2-react-schedule";

import { extend } from "@syncfusion/ej2-base";

import dataSource from "@/app/(authenticated)/utils/dataSource.json";
import CalendarPopUpTemplate from "@/app/(authenticated)/ui/CalendarPopUpTemplate";
import { useFetchRequests } from "../(adminPages)/admin/plan/overview/useFetchRequests";

function Calendar() {
  const { requests, isPending, error } = useFetchRequests();
  const scheduleObj = useRef<ScheduleComponent>(null);
  const [scheduleData, setScheduleData] = useState<Date>(new Date(2024, 3, 17));

  const onDragStart = (args: DragEventArgs): void => {
    console.log("object");
    if (args.navigation) args.navigation.enable = true;
  };

  const onClickEvent = (args: Record<string, any>): void => {
    // if (!args.event.RecurrenceRule) {
    //   scheduleObj.current.openEditor(args.event, "Save");
    // } else {
    //   scheduleObj.current.quickPopup.openRecurrenceAlert();
    // }
  };

  const onPopupOpen = (args: Record<string, any>) => {
    if (args.type === "Editor") {
      let statusElement = args.element.querySelector("#EventType");
      if (statusElement) {
        statusElement.setAttribute("name", "EventType");
      }
    }
  };

  const popupTemplate = (props: Record<string, any>) => {
    return <CalendarPopUpTemplate {...props} />;
  };

  // Create custom handler for calendar
  const setDayNames = (args: Record<string, any>) => {
    const date = new Date(args.date);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="day-header">
        <div className="day-name">{dayNames[date.getDay()]}</div>
      </div>
    );
  };

  return (
    <div className="schedule-control-section">
      <div className="col-lg-9 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            height="650px"
            ref={scheduleObj}
            selectedDate={scheduleData}
            eventSettings={{ dataSource: requests }}
            dragStart={onDragStart}
            eventClick={onClickEvent}
            showQuickInfo={false}
            editorTemplate={popupTemplate}
            popupOpen={onPopupOpen}
            currentView="WorkWeek"
            // showHeaderBar={false}
            startHour="07:00"
            endHour="18:00"
            dateHeaderTemplate={(args: Record<string, any>) =>
              setDayNames(args)
            }
          >
            <ViewsDirective>
              <ViewDirective option="WorkWeek" />
            </ViewsDirective>
            <Inject services={[WorkWeek]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  );
}

export default Calendar;

