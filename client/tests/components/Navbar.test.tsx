import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Use Router to wrap the Navbar
// import { describe, it as test, expect } from "@jest/globals"; // Use 'it' for the test function
import { describe, test, expect } from "@jest/globals"; // Use 'it' for the test function
import "@testing-library/jest-dom/extend-expect"; // Import extend-expect to add custom matchers

import Navbar from "../../src/shared/Navbar";

describe("Navbar", () => {
  test("renders the navbar with all links", () => {
    render(
      <Router>
        <Navbar />
      </Router>,
    );

    // Check for each link
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Tables")).toBeInTheDocument();
    expect(screen.getByText("Mentors")).toBeInTheDocument();
    expect(screen.getByText("Mentis")).toBeInTheDocument();

    // Check for the Profile link
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  test("links navigate to correct paths", () => {
    render(
      <Router>
        <Navbar />
      </Router>,
    );

    // Check the href attributes of the links
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Dashboard").closest("a")).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(screen.getByText("Tables").closest("a")).toHaveAttribute(
      "href",
      "/tables",
    );
    expect(screen.getByText("Mentors").closest("a")).toHaveAttribute(
      "href",
      "/mentors",
    );
    expect(screen.getByText("Mentis").closest("a")).toHaveAttribute(
      "href",
      "/mentis",
    );
  });
});
