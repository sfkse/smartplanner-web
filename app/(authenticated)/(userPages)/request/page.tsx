"use client";

import React from "react";
import Calendar from "@/app/(authenticated)/ui/Calendar";
import styled from "styled-components";
import Options from "../../ui/Options";

function RequestPage() {
  // const classFilter = ["Class 6C", "Class 7A", "Class 8B"];
  // const periodFilter = ["2024-2025", "2025-2026", "2026-2027"];
  return (
    <PageWrapper>
      <OptionsWrapper>
        <FilterWrapper>
          {/* <DropdownList placeholder="Choose class" filters={classFilter} />
          <DropdownList placeholder="Choose period" filters={periodFilter} /> */}
        </FilterWrapper>

        {/* <Options /> */}
      </OptionsWrapper>
      <PageHeader>Create Request</PageHeader>
      <PageSubHeader>Block off times for your class</PageSubHeader>
      {/* <Calendar /> */}
    </PageWrapper>
  );
}

export default RequestPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
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

const PageHeader = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const PageSubHeader = styled.h2`
  font-size: var(--font-size-regular);
  font-weight: 400;
  margin-bottom: 1rem;
`;

