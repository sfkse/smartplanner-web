import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import React from "react";
import DropdownList from "./DropdownList";

type DialogPopupProps = {
  open: boolean;
  confirmation?: boolean;
  dialogueContent: {
    title: string;
    description?: string;
    fields: any[];
  };
  handleClose: () => void;
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function DialogPopup({
  open,
  dialogueContent,
  handleClose,
  submit,
  confirmation,
}: DialogPopupProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: submit,
      }}
    >
      <DialogTitle>{dialogueContent.title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{dialogueContent.description}</DialogContentText>
        {dialogueContent.fields.map((field) => (
          <>
            {field.type === "text" ? (
              <TextField
                key={field.name}
                autoFocus
                margin="dense"
                name={field.name}
                id={field.name}
                label={field.label}
                type={field.type}
                fullWidth
                required={field.required}
                defaultValue={field.value}
                onChange={field.handleOnChange}
                variant="standard"
              />
            ) : field.type === "dropdown" ? (
              <DropdownList
                key={field.name}
                name={field.name}
                dataSource={field.dataSource || []}
                placeholder={field.label}
                fields={field.fields}
                handleOnChange={field.handleOnChange}
              />
            ) : (
              <DropdownList
                key={field.name}
                name={field.name}
                dataSource={field.dataSource || []}
                placeholder={field.label}
                fields={field.fields}
                handleOnChange={field.handleOnChange}
              />
            )}
          </>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" color={confirmation ? "error" : "primary"}>
          {confirmation ? "Delete" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );

  //   );
}

export default DialogPopup;

