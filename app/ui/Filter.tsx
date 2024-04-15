"use client";

import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import React from "react";

type FilterProps = {
  filters: string[];
  placeholder: string;
};

function Filter(props: FilterProps) {
  return (
    <div>
      <DropDownListComponent
        id="EventType"
        placeholder={props.placeholder}
        data-name="EventType"
        className="e-field"
        dataSource={props.filters}
        value={"Class 6C" || null}
      ></DropDownListComponent>
    </div>
  );
}

export default Filter;

