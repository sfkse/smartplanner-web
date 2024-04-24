"use client";

import styled from "styled-components";
import { useRef, useState } from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import DialogPopup from "@/app/(authenticated)/ui/DialogPopup";
import Button from "@/app/(authenticated)/ui/Button";
import Table from "@/app/(authenticated)/ui/Table";

import { useFetchClasses } from "./useFetchClasses";

import Loading from "../../loading";
import { useCreateClass } from "./useCreateClass";
import { Class } from "./types";
import { ModalContent } from "../../types/modal";
import { useUpdateClass } from "./useUpdateClass";
import { useRemoveClass } from "./useRemoveClass";
import AddButton from "../../ui/AddButton";

function Page() {
  const [modal, setModal] = useState({
    open: false,
    modalType: "",
    dataToDelete: "",
    content: {
      title: "",
      description: "",
      fields: [] as ModalContent[],
    },
  });

  const classNameInput = useRef<{
    idclasses: string;
    value: string;
  } | null>(null);

  const { classes, error, isPending } = useFetchClasses();
  const {
    mutate,
    error: createError,
    isPending: createPending,
  } = useCreateClass();

  const {
    mutate: updateClass,
    error: updateError,
    isPending: updatePending,
  } = useUpdateClass();

  const {
    mutate: removeClass,
    error: removeError,
    isPending: removePending,
  } = useRemoveClass();

  function fetchTableActions(id: string) {
    return [
      {
        text: "Delete",
        color: "error",
        icon: <DeleteForeverOutlinedIcon />,
        callback: () => handleRemoveClass(id),
      },
    ];
  }

  const tableHeaders = ["Klassnamn", "Actions"]; // Column tableHeaders expected in the data object

  const tableData = classes.map((klass: Class) => {
    return {
      Klassnamn: (
        <>
          {klass.name}
          <EditOutlinedIcon
            onClick={() => handleEditClassName(klass)}
            sx={{
              fontSize: "1rem",
              color: "var(--primary-light)",
              cursor: "pointer",
              marginLeft: "0.5rem",
            }}
          />
        </>
      ),
      Actions: fetchTableActions(klass.idclasses),
    };
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    if (modal.modalType === "create") mutate(formJson as Class);
    if (modal.modalType === "edit") {
      const data = {
        idclasses: classNameInput.current.idclasses,
        name: classNameInput.current.value,
      };
      updateClass(data);
    }
    if (modal.modalType === "remove") {
      removeClass(modal.dataToDelete);
    }

    handleClose();
  };

  function handleEditClassName(klass: Class) {
    console.log("Edit", klass);
    setModal({
      ...modal,
      open: true,
      modalType: "edit",
      content: {
        title: "Edit Class",
        description: "",
        fields: [
          {
            label: "Class Name",
            name: "name",
            type: "text",
            value: klass.name,
            handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              classNameInput.current = {
                idclasses: klass.idclasses,
                value: e.target.value,
              };
            },
          },
        ],
      },
    });
  }

  const handleOpen = () => {
    setModal({
      ...modal,
      open: true,
      modalType: "create",
      content: {
        title: "Create New Class",
        description: "",
        fields: [
          {
            label: "Class Name",
            name: "name",
            type: "text",
          },
        ],
      },
    });
  };

  const handleRemoveClass = (id: string) => {
    setModal({
      ...modal,
      open: true,
      modalType: "remove",
      dataToDelete: id,
      content: {
        title: "Delete Class",
        description: "Are you sure you want to delete this class?",
        fields: [],
      },
    });
  };

  const handleClose = () => {
    setModal({
      ...modal,
      open: false,
    });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (createError) {
    return <div>Error: {createError.message}</div>;
  }

  return (
    <Loading isLoading={createPending || isPending}>
      <PageHeader>
        <DialogPopup
          open={modal.open}
          handleClose={handleClose}
          dialogueContent={modal.content}
          confirmation={modal.modalType === "remove"}
          submit={handleSubmit}
        />
        <OptionsWrapper>
          <ButtonsWrapper>
            <Button
              text="LÄGG TILL KLASSE"
              startIcon={<PersonAddAltOutlinedIcon />}
              handleClick={handleOpen}
            />
          </ButtonsWrapper>
        </OptionsWrapper>
        <Table>
          <Table.Header>
            <Table.TableHeaderRow>
              <Table.Head headerElements={tableHeaders} />
            </Table.TableHeaderRow>
          </Table.Header>
          <Table.Body>
            <Table.TableBodyRow tableData={tableData} />
          </Table.Body>
        </Table>
        <AddButton callback={handleOpen} label="+ Lägg till"></AddButton>
      </PageHeader>
    </Loading>
  );
}

export default Page;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
`;

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

