import React from "react";

type CalendarPopupHeaderProps = {
  title: string;
};

function CalendarPopupHeader({ title }: CalendarPopupHeaderProps) {
  console.log(title);
  return (
    <div id="event-header">{title && <div id="header-title">{title}</div>}</div>
  );
}

export default CalendarPopupHeader;

