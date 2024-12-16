import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useMutation } from "@tanstack/react-query";

import SignupMenti from "@/pages/Signup/SignupPages/SignupMenti";
import SignupMentor from "@/pages/Signup/SignupPages/SignupMentor";

jest.mock("@/services/signupServices", () => ({
  mentiSignup: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

describe("Signup Component - Successful Submission", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Signup Menti - Success", async () => {
    render(
      <Router>
        <SignupMenti />
      </Router>,
    );

    fireEvent.change(screen.getByPlaceholderText(/Israel Israeli/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/m@example.com/i), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/0545454455/i), {
      target: { value: "0545454455" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tel Aviv University"), {
      target: { value: "Harvard University" },
    });
    fireEvent.change(screen.getByPlaceholderText("What is your experience"), {
      target: { value: "Software Engineering" },
    });
    fireEvent.change(screen.getByPlaceholderText("What you need help with"), {
      target: { value: "Career growth" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Anything we need to know about you?"),
      {
        target: { value: "I am passionate about coding." },
      },
    );

    fireEvent.click(screen.getByRole("button", { name: /create an account/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        name: "John Doe",
        email: "johndoe@example.com",
        phone_number: "054545445",
        password: "password123",
        education: "Harvard University",
        experience: "Software Engineering",
        goals: "Career growth",
        comments: "I am passionate about coding.",
      });
    });
  });

  test("Signup Mentor - Success", async () => {
    render(
      <Router>
        <SignupMentor />
      </Router>,
    );

    fireEvent.change(screen.getByPlaceholderText("Israel Israeli"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("m@example.com"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("054545445"), {
      target: { value: "054545445" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Full Stack Developer"), {
      target: { value: "Developer" },
    });
    fireEvent.change(screen.getByPlaceholderText("Apple"), {
      target: { value: "Apple Inc." },
    });

    fireEvent.click(screen.getByText("Create an account"));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        name: "John Doe",
        email: "johndoe@example.com",
        phone_number: "054545445",
        password: "password123",
        position: "Developer",
        company: "Apple Inc.",
        experience: undefined,
        field: undefined,
      });
    });

    // expect(mockMutate).toHaveBeenCalledWith({
    //   name: "John Doe",
    //   email: "johndoe@example.com",
    //   phone_number: "054545445",
    //   password: "password123",
    //   position: "Developer",
    //   company: "Apple Inc.",
    //   experience: undefined,
    //   field: undefined,
    // });
  });
});
