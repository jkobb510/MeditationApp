import { render, screen, fireEvent } from "@testing-library/react";
import Controls from "./Controls";

describe("Controls Component", () => {
    test("shows PlayIcon when isRunning is false", () => {
        render(<Controls isRunning={false} onStartPause={jest.fn()} onReset={jest.fn()} />);
        expect(screen.getByTestId("play-icon")).toBeInTheDocument();
    });

    test("shows PauseIcon when isRunning is true", () => {
        render(<Controls isRunning={true} onStartPause={jest.fn()} onReset={jest.fn()} />);
        expect(screen.getByTestId("pause-icon")).toBeInTheDocument();
    });


    test("calls onStartPause when the button is clicked", () => {
        const mockStartPause = jest.fn();
        render(<Controls isRunning={false} onStartPause={mockStartPause} onReset={jest.fn()} />);
        fireEvent.click(screen.getByRole("button"));
        expect(mockStartPause).toHaveBeenCalledTimes(1);
    });

    test("calls onReset when ResetButton is clicked", () => {
        const mockReset = jest.fn();
        render(<Controls isRunning={false} onStartPause={jest.fn()} onReset={mockReset} />);
        fireEvent.click(screen.getByText("Reset"));
        expect(mockReset).toHaveBeenCalledTimes(1);
    });
});
