import { describe, it, expect, vi, beforeEach } from "vitest";
import { validateTimerForm, TimerFormData } from "./validation";
import { toast } from "sonner";

// Mock toast.error
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("validateTimerForm", () => {
  const validData: TimerFormData = {
    title: "Test Timer",
    description: "This is a test",
    hours: 1,
    minutes: 30,
    seconds: 15,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns true for valid data", () => {
    expect(validateTimerForm(validData)).toBe(true);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("returns false if title is empty", () => {
    const data = { ...validData, title: "  " };
    expect(validateTimerForm(data)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Title is required");
  });

  it("returns false if title is over 50 characters", () => {
    const data = { ...validData, title: "a".repeat(51) };
    expect(validateTimerForm(data)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Title must be less than 50 characters"
    );
  });

  it("returns false if any time value is negative", () => {
    const data = { ...validData, hours: -1 };
    expect(validateTimerForm(data)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Time values cannot be negative");
  });

  it("returns false if minutes or seconds > 59", () => {
    const data1 = { ...validData, minutes: 60 };
    expect(validateTimerForm(data1)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Minutes and seconds must be between 0 and 59"
    );

    const data2 = { ...validData, minutes: 10, seconds: 60 };
    expect(validateTimerForm(data2)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Minutes and seconds must be between 0 and 59"
    );
  });

  it("returns false if total time is zero", () => {
    const data = { ...validData, hours: 0, minutes: 0, seconds: 0 };
    expect(validateTimerForm(data)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Please set a time greater than 0"
    );
  });

  it("returns false if time exceeds 24 hours", () => {
    const data = { ...validData, hours: 25 };
    expect(validateTimerForm(data)).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Timer cannot exceed 24 hours");
  });
});
