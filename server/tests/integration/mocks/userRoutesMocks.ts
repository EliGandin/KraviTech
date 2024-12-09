export const existingEmailValidationMock = jest.fn(async () => ({
  isValid: true,
  message: "",
}));

export const createMentorMock = jest.fn().mockResolvedValue({});

export const createMentiMock = jest.fn().mockResolvedValue({});

export const loginMock = jest.fn().mockResolvedValue({
  id: 1,
  name: "Test",
  email: "test@test.com",
});
