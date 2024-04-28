import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import React from "react";

function CalendarPopUpTemplate(props: Record<string, any>) {
  console.log(props);
  return props !== undefined ? (
    <table className="custom-event-editor">
      <tbody>
        <tr>
          <td className="e-textlabel">Title</td>
          <td colSpan={4}>
            <input
              id="Subject"
              className="e-field e-input"
              type="text"
              name="Subject"
            />
          </td>
        </tr>
        {/* <tr>
          <td className="e-textlabel">Status</td>
          <td colSpan={4}>
            <DropDownListComponent
              id="EventType"
              placeholder="Choose status"
              data-name="EventType"
              className="e-field"
              dataSource={["New", "Requested", "Confirmed"]}
              value={props.EventType || null}
            ></DropDownListComponent>
          </td>
        </tr> */}
        <tr>
          <td className="e-textlabel">Start</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="StartTime"
              data-name="StartTime"
              value={new Date(props.startTime)}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">End</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="EndTime"
              data-name="EndTime"
              value={new Date(props.endTime || props.EndTime)}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Description</td>
          <td colSpan={4}>
            <textarea
              id="Description"
              className="e-field e-input"
              name="Description"
              rows={3}
              cols={50}
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div></div>
  );
}

export default CalendarPopUpTemplate;

