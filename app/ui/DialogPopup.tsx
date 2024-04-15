import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import React from "react";

type FormField = {
  label: string;
  name: string;
  type: string;
  required?: boolean;
};

type DialogPopupProps = {
  open: boolean;
  dialogueContent: {
    title: string;
    fields: FormField[];
  };
  handleClose: () => void;
};

function DialogPopup({ open, dialogueContent, handleClose }: DialogPopupProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          console.log(formJson);
          handleClose();
        },
      }}
    >
      <DialogTitle>{dialogueContent.title}</DialogTitle>
      <DialogContent>
        {dialogueContent.fields.map((field) => (
          <TextField
            key={field.name}
            autoFocus
            margin="dense"
            id={field.name}
            label={field.label}
            type={field.type}
            fullWidth
            required={field.required}
            variant="standard"
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
  // }: DialogPopupProps) {
  //   return (
  //     <Dialog
  //       open={open}
  //       onClose={handleClose}
  //       PaperProps={{
  //         component: "form",
  //         onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
  //           event.preventDefault();
  //           const formData = new FormData(event.currentTarget);
  //           const formJson = Object.fromEntries((formData as any).entries());
  //           const email = formJson.email;
  //           console.log(email);
  //           handleClose();
  //         },
  //       }}
  //     >
  //       <DialogTitle>{title}</DialogTitle>
  //       <DialogContent>
  //         {/* <DialogContentText>
  //           To subscribe to this website, please enter your email address here. We
  //           will send updates occasionally.
  //         </DialogContentText> */}
  //         {formFields.map((field) => (
  //           <TextField
  //             key={field.name}
  //             autoFocus
  //             margin="dense"
  //             id={field.name}
  //             label={field.label}
  //             type={field.type}
  //             fullWidth
  //             required={field.required}
  //             variant="standard"
  //           />
  //         ))}
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleClose}>Cancel</Button>
  //         <Button type="submit">Save</Button>
  //       </DialogActions>
  //     </Dialog>
  //   );
}

export default DialogPopup;

