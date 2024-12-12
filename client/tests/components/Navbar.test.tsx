import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, test, expect } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";

import Navbar from "@/components/shared/Navbar.tsx";
import { useRecoilValue } from "recoil";

jest.mock("recoil", () => {
  const actualRecoil = jest.requireActual("recoil");
  return {
    ...actualRecoil,
    useRecoilValue: jest.fn(),
  };
});

describe("Navbar", () => {
  test("renders the navbar with all links", () => {
    (useRecoilValue as jest.Mock).mockReturnValue({ name: "Test User" });

    render(
      <Router>
        <Navbar />
      </Router>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Tables")).toBeInTheDocument();
    expect(screen.getByText("Mentors")).toBeInTheDocument();
    expect(screen.getByText("Mentis")).toBeInTheDocument();
  });

  test("links navigate to correct paths", () => {
    (useRecoilValue as jest.Mock).mockReturnValue({ name: "Test User" });

    render(
      <Router>
        <Navbar />
      </Router>,
    );

    // Check the href attributes of the links
    expect(screen.getByText("Home").closest("a")).toHaveAttribute(
      "href",
      "/app/",
    );
    expect(screen.getByText("Dashboard").closest("a")).toHaveAttribute(
      "href",
      "/app/dashboard",
    );
    expect(screen.getByText("Tables").closest("a")).toHaveAttribute(
      "href",
      "/app/tables",
    );
    expect(screen.getByText("Mentors").closest("a")).toHaveAttribute(
      "href",
      "/app/mentors",
    );
    expect(screen.getByText("Mentis").closest("a")).toHaveAttribute(
      "href",
      "/app/mentis",
    );
  });
});
