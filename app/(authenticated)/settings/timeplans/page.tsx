"use client";

import DialogPopup from "@/app/(authenticated)/ui/DialogPopup";
import styled from "styled-components";
import { useRef, useState } from "react";
import Link from "next/link";
import Button from "@/app/(authenticated)/ui/Button";
import Table from "@/app/(authenticated)/ui/Table";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useRouter } from "next/navigation";
import { useFetchClasses } from "../classes/useFetchClasses";
import Loading from "../../loading";
import { ClassTimeplan } from "./types";
import { Class } from "../classes/types";
import { useFetchClassTimeplans } from "./useFetchClassTimeplans";
import AddButton from "../../ui/AddButton";
import { ModalContent } from "../../types/modal";
import { useCreateClassTimeplan } from "./useCreateClassTimeplan";
import { useUpdateClassTimeplan } from "./useUpdateClassTimeplan";
import { useRemoveTimeplan } from "./useRemoveTimeplan";
import { toast } from "react-toastify";

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

  const createTimeplanRef = useRef<{
    idclasses: string;
    value: string;
  } | null>(null);
  const updateTimeplanRef = useRef<{
    timeplanname: string;
    idclasstimeplans: string;
  } | null>(null);
  const { classes, error, isPending } = useFetchClasses();

  const {
    classTimeplans,
    error: classTimeplansError,
    isPending: classTimeplansIsPending,
  } = useFetchClassTimeplans();

  const {
    mutate: createClassTimePlan,
    error: createClassTimePlanError,
    isPending: createClassTimePlanPending,
  } = useCreateClassTimeplan();

  const {
    mutate: updateClassTimeplan,
    error: updateClassTimeplanError,
    isPending: updateClassTimeplanPending,
  } = useUpdateClassTimeplan();

  const {
    mutate: removeTimeplan,
    error: removeTimeplanError,
    isPending: removeTimeplanPending,
  } = useRemoveTimeplan();

  const router = useRouter();

  const isLoading =
    isPending ||
    classTimeplansIsPending ||
    updateClassTimeplanPending ||
    createClassTimePlanPending ||
    removeTimeplanPending;

  // const tableActions = ;

  const headers = ["Timplan", "Klass", "Actions"]; // Column headers expected in the data object
  const tableData = classTimeplans.map((classTimeplan: ClassTimeplan) => {
    return {
      Timplan: (
        <>
          {classTimeplan.timeplanname}
          <EditOutlinedIcon
            onClick={() => handleEditTimeplanName(classTimeplan)}
            sx={{
              fontSize: "1rem",
              color: "var(--primary-light)",
              cursor: "pointer",
              marginLeft: "0.5rem",
            }}
          />
        </>
      ),
      Klass: classTimeplan.classname,
      Actions: fetchTableActions(classTimeplan.idclasstimeplans),
    };
  });

  function fetchTableActions(id: string) {
    return [
      {
        text: "SET TIMES",
        icon: <AccessTimeOutlinedIcon />,
        callback: () => router.push(`/settings/timeplans/${id}`),
      },
      {
        text: "Delete",
        color: "error",
        icon: <DeleteForeverOutlinedIcon />,
        callback: () => handleRemoveTimeplan(id),
      },
    ];
  }

  function handleEditTimeplanName(classTimeplan: ClassTimeplan) {
    setModal({
      open: true,
      modalType: "edit",
      dataToDelete: "",
      content: {
        title: "Redigera timplan",
        description: "",
        fields: [
          {
            label: "Timplan",
            type: "text",
            name: classTimeplan.idclasstimeplans,
            value: classTimeplan.timeplanname,
            handleOnChange: (e) => {
              updateTimeplanRef.current = {
                timeplanname: e.target.value,
                idclasstimeplans: classTimeplan.idclasstimeplans,
              };
            },
          },
        ],
      },
    });
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    type: string
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    if (type === "create") {
      const data: ClassTimeplan = {
        idclasstimeplans: "",
        timeplanname: formJson.timeplanname,
        idclasses: createTimeplanRef.current?.value as string,
      };
      createClassTimePlan(data);
    }
    if (type === "edit") {
      updateClassTimeplan(updateTimeplanRef.current as any);
    }
    if (type === "remove") {
      removeTimeplan(modal.dataToDelete);
    }
    handleClose();
  };

  const handleClose = () => {
    setModal({
      open: false,
      modalType: "",
      dataToDelete: "",
      content: {
        title: "",
        description: "",
        fields: [],
      },
    });
  };

  const handleOpen = () => {
    setModal({
      open: true,
      dataToDelete: "",
      modalType: "create",
      content: {
        title: "Skapa timplan",
        description: "",
        fields: [
          {
            label: "Timplan",
            name: "timeplanname",
            type: "text",
          },
          {
            label: "Klass",
            name: "class",
            type: "dropdown",
            value: "",
            handleOnChange: (e) => {
              console.log(e.target.itemData);
              createTimeplanRef.current = e.target.itemData;
            },

            dataSource: classes.map((klass: Class) => ({
              text: klass.name,
              value: klass.idclasses,
            })),
            fields: { text: classes.name, value: classes.idclasses },
          },
        ],
      },
    });
  };

  const handleRemoveTimeplan = (id: string) => {
    setModal({
      open: true,
      dataToDelete: id,
      modalType: "remove",
      content: {
        title: "Ta bort timplan",
        description: "Är du säker på att du vill ta bort timplan?",
        fields: [],
      },
    });

    // removeTimeplan(id);
  };

  if (error || classTimeplansError) {
    toast.error("Något gick fel");
  }

  return (
    <Loading isLoading={isLoading}>
      <PageHeader>
        <DialogPopup
          open={modal.open}
          handleClose={handleClose}
          dialogueContent={modal.content}
          confirmation={modal.modalType === "remove"}
          submit={(e) => handleSubmit(e, modal.modalType)}
        />
        <OptionsWrapper>
          <ButtonsWrapper>
            <Button
              text="Lägg till"
              startIcon={<AddOutlinedIcon />}
              handleClick={handleOpen}
            />
          </ButtonsWrapper>
        </OptionsWrapper>
        <Table>
          <Table.Header>
            <Table.TableHeaderRow>
              <Table.Head headerElements={headers} />
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

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

