export const existingEmailValidationMock = jest.fn().mockResolvedValueOnce({
  isValid: true,
  message: "",
});

export const createMentorMock = jest.fn().mockResolvedValue({});

export const createMentiMock = jest.fn().mockResolvedValue({});
