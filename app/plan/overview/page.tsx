"use client";

import React from "react";
import Calendar from "../../ui/Calendar";
import styled from "styled-components";
import Filter from "../../ui/Filter";
import Options from "../../ui/Options";

function Page() {
  const classFilter = ["Class 6C", "Class 7A", "Class 8B"];
  const periodFilter = ["2024-2025", "2025-2026", "2026-2027"];
  return (
    <PageWrapper>
      <OptionsWrapper>
        <FilterWrapper>
          <Filter placeholder="Choose class" filters={classFilter} />
          <Filter placeholder="Choose period" filters={periodFilter} />
        </FilterWrapper>
        <Options />
      </OptionsWrapper>
      <Calendar />
    </PageWrapper>
  );
}

export default Page;

const PageWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 80%;
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

