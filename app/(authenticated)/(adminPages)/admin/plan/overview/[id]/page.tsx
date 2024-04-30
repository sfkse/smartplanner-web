"use client";

import Options from "@/app/(authenticated)/ui/Options";
import { usePathname } from "next/navigation";
import React from "react";
import styled from "styled-components";
import { Yearlyplan } from "../types";
import { useFetchSingleYearlyPlan } from "../useFetchSingleYearlyPlan";
import Calendar from "@/app/(authenticated)/ui/Calendar";
import DropdownList from "@/app/(authenticated)/ui/DropdownList";
import SelectBox from "@/app/(authenticated)/ui/SelectBox";

function YearlyPlanDetail() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const { singleYearlyplan, error, isPending } = useFetchSingleYearlyPlan(
    id as Yearlyplan["idyearlyplans"]
  );
  console.log(singleYearlyplan);
  return (
    <PageWrapper>
      <OptionsWrapper>
        <SelectBox />
        <Options />
      </OptionsWrapper>
      <CalendarAndTimeWrapper>
        <TimesWrapper>
          <LessonTimes>
            <Name>Math</Name>
            <Minutes>30 / 30</Minutes>
          </LessonTimes>
          <LessonTimes>
            <Name>English</Name>
            <Minutes>30 / 30</Minutes>
          </LessonTimes>
          <LessonTimes>
            <Name>Science</Name>
            <Minutes>30 / 30</Minutes>
          </LessonTimes>
        </TimesWrapper>
        <CalendarWrapper>
          <Calendar />
        </CalendarWrapper>
      </CalendarAndTimeWrapper>
    </PageWrapper>
  );
}

export default YearlyPlanDetail;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
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

const CalendarAndTimeWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 3;
`;

const TimesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const LessonTimes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.p`
  font-size: 1.2rem;
  color: var(--primary-dark);
`;

const Minutes = styled.p`
  font-size: 1rem;
  color: var(--primary-dark);
`;

