"use client";

import styled from "styled-components";
import { useRef, useState } from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import DialogPopup from "@/app/(authenticated)/ui/DialogPopup";
import Button from "@/app/(authenticated)/ui/Button";
import Table from "@/app/(authenticated)/ui/Table";

import Loading from "../../../../loading";
import { Yearlyplan } from "./types";
import { ModalContent } from "../../../../types/modal";
import AddButton from "../../../../ui/AddButton";
import { useFetchYearlyPlans } from "./useFetchYearlyPlans";
import Link from "next/link";
import { useCreateYearlyPlan } from "./useCreateYearlyPlan";
import { useUpdateYearlyPlans } from "./useUpdateYearlyPlans";
import { useRemoveYearlyPlan } from "./useRemoveYearlyPlan";
import Calendar from "../../../../ui/Calendar";

function PlanOverview() {
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
    idyearlyplans: string;
    value: string;
  }>({
    idyearlyplans: "",
    value: "",
  });

  const { yearlyPlans, error, isPending } = useFetchYearlyPlans();
  const {
    mutate,
    error: createError,
    isPending: createPending,
  } = useCreateYearlyPlan();

  const {
    mutate: updateYearlyplan,
    error: updateError,
    isPending: updatePending,
  } = useUpdateYearlyPlans();

  const {
    mutate: removeYearlyPlan,
    error: removeError,
    isPending: removePending,
  } = useRemoveYearlyPlan();

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

  const tableData = yearlyPlans.map((plan: Yearlyplan) => {
    return {
      Namn: (
        <>
          <Link href={`/admin/plan/overview/${plan.idyearlyplans}`}>
            {plan.title}
          </Link>
          <EditOutlinedIcon
            onClick={() => handleEditPlanName(plan)}
            sx={{
              fontSize: "1rem",
              color: "var(--primary-light)",
              cursor: "pointer",
              marginLeft: "0.5rem",
            }}
          />
        </>
      ),
      Actions: fetchTableActions(plan.idyearlyplans),
    };
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    if (modal.modalType === "create") mutate(formJson as Yearlyplan);
    if (modal.modalType === "edit") {
      const data = {
        idyearlyplans: classNameInput.current.idyearlyplans,
        title: classNameInput.current.value,
      };
      updateYearlyplan(data);
    }
    if (modal.modalType === "remove") {
      removeYearlyPlan(modal.dataToDelete);
    }

    handleClose();
  };

  function handleEditPlanName(plan: Yearlyplan) {
    setModal({
      ...modal,
      open: true,
      modalType: "edit",
      content: {
        title: "Edit Plan Name",
        description: "",
        fields: [
          {
            label: "Plan Name",
            name: "title",
            type: "text",
            value: plan.title,
            handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              classNameInput.current = {
                idyearlyplans: plan.idyearlyplans,
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
        title: "Create New Yearly Plan",
        description: "",
        fields: [
          {
            label: "Name",
            name: "title",
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
        title: "Delete Plan",
        description: "Are you sure you want to delete this plan?",
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

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // if (createError) {
  //   return <div>Error: {createError.message}</div>;
  // }

  return (
    <Loading isLoading={isPending}>
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

export default PlanOverview;

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

