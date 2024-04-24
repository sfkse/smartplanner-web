"use client";

import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import React from "react";
import { text } from "stream/consumers";

type DropdownListProps = {
  dataSource: { text: string; value: string }[];
  name: string;
  placeholder: string;
  fields: { text: string; value: string };
  handleOnChange?: (e: any) => void;
};

function DropdownList(props: DropdownListProps) {
  return (
    <div>
      {/* <DropDownListComponent
        name={props.name}
        placeholder={props.placeholder}
        dataSource={[{ text: "text", value: "Value" },{text: "text2", value: "Value2"}]}
        fields={{ text: "text", value: "value" }}
        // value={null}
      /> */}
      <DropDownListComponent
        name={props.name}
        placeholder={props.placeholder}
        dataSource={props.dataSource}
        fields={props.fields} // Ensure your options array objects have 'label' and 'id' keys
        onChange={props?.handleOnChange}
        // value={null}
      />
    </div>
  );
}

export default DropdownList;

