"use client";
import styled from "styled-components";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Wrapper>
        <Link href="/plan">Plan</Link>
      </Wrapper>
    </main>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 80%;
`;

