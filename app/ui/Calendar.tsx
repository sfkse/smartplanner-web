"use client";

import "./index.css";
import { useState, useRef } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  Month,
  Inject,
  Resize,
  DragAndDrop,
  DragEventArgs,
} from "@syncfusion/ej2-react-schedule";

import { extend } from "@syncfusion/ej2-base";

import dataSource from "@/app/utils/dataSource.json";
import CalendarPopUpTemplate from "@/app/ui/CalendarPopUpTemplate";

function Calendar() {
  const scheduleObj = useRef<ScheduleComponent>(null);
  const [scheduleData, setScheduleData] = useState<Date>(new Date(2024, 3, 17));
  const data: Record<string, any>[] = extend(
    [],
    (dataSource as Record<string, any>).scheduleData,
    false,
    true
  ) as Record<string, any>[];

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

  return (
    <div>
      <div className="schedule-control-section">
        <div className="col-lg-9 control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              height="650px"
              ref={scheduleObj}
              selectedDate={scheduleData}
              eventSettings={{ dataSource: data }}
              dragStart={onDragStart}
              eventClick={onClickEvent}
              showQuickInfo={false}
              editorTemplate={popupTemplate}
              popupOpen={onPopupOpen}
            >
              <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="Month" />
              </ViewsDirective>
              <Inject
                services={[
                  Day,
                  Week,
                  // WorkWeek,
                  Month,
                  // Agenda,
                  Resize,
                  DragAndDrop,
                ]}
              />
            </ScheduleComponent>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;

