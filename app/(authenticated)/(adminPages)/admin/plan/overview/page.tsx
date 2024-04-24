"use client";

import React from "react";
import Calendar from "@/app/(authenticated)/ui/Calendar";
import styled from "styled-components";
import DropdownList from "../../../../ui/DropdownList";
import Options from "../../../../ui/Options";
import { useFetchRequests } from "./useFetchRequests";

function PlanOverviewPage() {
  // const classFilter = ["Class 6C", "Class 7A", "Class 8B"];
  // const periodFilter = ["2024-2025", "2025-2026", "2026-2027"];
  return (
    <PageWrapper>
      <OptionsWrapper>
        <FilterWrapper>
          {/* <DropdownList placeholder="Choose class" filters={classFilter} />
          <DropdownList placeholder="Choose period" filters={periodFilter} /> */}
        </FilterWrapper>
        <Options />
      </OptionsWrapper>
      <Calendar />
    </PageWrapper>
  );
}

export default PlanOverviewPage;

const PageWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 60%;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const OptionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
