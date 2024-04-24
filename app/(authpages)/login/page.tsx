"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

import { useLoginUser } from "../hooks/useLoginUser";

import Button from "@/app/(authenticated)/ui/Button";
import Loading from "@/app/(authpages)/loading";

export default function Page() {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  // AUTHENTICATION
  const { mutate, error, isPending } = useLoginUser();

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(formData);
  }

  if (error) {
    setErrorMessage(error.message);
  }

  return (
    <Loading isLoading={isPending}>
      <PageWrapper>
        <FormWrapper>
          <FromHeader>Sign in</FromHeader>
          <FormSubHeader>Sign in to your account</FormSubHeader>
          <Form onSubmit={handleOnSubmit}>
            <InputGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </InputGroup>
            <InputGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </InputGroup>
            <Button
              text="Sign in"
              handleClick={(e) => handleOnSubmit(e)}
              variant="contained"
              style={{ padding: ".5rem" }}
              type="submit"
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Form>
        </FormWrapper>
      </PageWrapper>
    </Loading>
  );
}

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: auto;
  padding: 2.5rem;
  width: 35%;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FromHeader = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

const FormSubHeader = styled.h2`
  font-size: 1rem;
  text-align: center;
  color: var(--primary-light);
  font-weight: lighter;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--primary-light-transparent);
  border-radius: 0.25rem;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875rem;
  text-align: center;
`;

