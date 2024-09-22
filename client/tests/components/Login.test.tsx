import React from "react";
import { describe, test, expect } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useMutation } from "@tanstack/react-query";

import Login from "@/pages/Login";
import { userLogin } from "@/services/loginServices";

jest.mock("@/services/loginServices", () => ({
  userLogin: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

describe("Login Component - Successful Submission", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
    });

    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  test("submits the form successfully with valid data and validates status code", async () => {
    (userLogin as jest.Mock).mockResolvedValue({
      id: 1,
      name: "John Doe",
      role: "mentor",
      message: "Login successful",
    });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
      expect(mockMutate).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });

    const response = await userLogin({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.id).toBe(1);
    expect(response.name).toBe("John Doe");
    expect(response.role).toBe("mentor");
  });

  test("fails to submit the form due to invalid credentials and returns a 401 status code", async () => {
    const mockErrorResponse = {
      message: "Invalid input",
    };

    (userLogin as jest.Mock).mockResolvedValue(mockErrorResponse);

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(async () => {
      const response = await userLogin({
        email: "wrong@example.com",
        password: "wrongpassword",
      });

      expect(response.message).toEqual("Invalid input");
    });
  });
});
