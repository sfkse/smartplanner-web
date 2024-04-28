import React from "react";

function CalendarPopupFooter() {
  return (
    <div id="event-footer">
      <div id="verify">
        <input type="checkbox" id="check-box" value="unchecked" />
        <label htmlFor="check-box" id="text">
          Verified
        </label>
      </div>
      <div id="right-button">
        <button
          id="Save"
          className="e-control e-btn e-primary"
          disabled
          data-ripple="true"
        >
          Save
        </button>
        <button
          id="Cancel"
          className="e-control e-btn e-primary"
          data-ripple="true"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CalendarPopupFooter;
