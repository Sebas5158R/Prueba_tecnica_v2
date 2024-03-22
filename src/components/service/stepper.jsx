import React, { useEffect, useRef, useState } from "react";

const Stepper = ({steps, currentStep}) => {

    const [newStep, setNewStep] = useState([]);
    const stepRef = useRef();

    const updateStep = (stepNumber, steps) => {
        const newStep = [...steps];
        let count = 0;

        while(count < newStep.length) {
            if(count === stepNumber) {
                newStep[count] = {
                    ...newStep[count],
                    highlighted: true,
                    selected: true,
                    completed: true
                };
                count++;
            } else if(count < stepNumber) {
                newStep[count] = {
                    ...newStep[count],
                    highlighted: false,
                    selected: true,
                    completed: true
                };
                count++;
            } else {
                newStep[count] = {
                    ...newStep[count],
                    highlighted: false,
                    selected: false,
                    completed: false
                };
                count++;
            }
        }
        return newStep;
    }

    useEffect(() => {
        const stepsState = steps.map((step, index) => Object.assign({}, {
            service: step,
            completed: false,
            highlighted: index === 0 ? true : false,
            selected: index === 0 ? true : false
        }));
        stepRef.current = stepsState;
        const current = updateStep(currentStep - 1, stepRef.current);
        setNewStep(current);
    }, [steps, currentStep])

    const displaySteps = newStep.map((step, index) => {
        return(
            <div key={index} className={index === step.length - 1 ? "w-full flex items-center" : "flex items-center"}>
            <div className="relative flex flex-col items-center text-teal-600">
                <div className={`rounded-full transition duration-500 ease-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${step.selected ? "bg-green-600 text-white font-bold border-green-600" : ""}`}>
                    {/* DISPLAY NUMBER */} 1
                </div>
                <div className="absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase">
                    {/* CATEGORY */}
                    Category
                </div>
            </div>
            <div className="flex-auto border-t-2 transition duration-500 ease-in-out">
                {/* DISPLAY LINE */}
            </div>
        </div>
        );
    });

    return(
        <div className="mx-4 p-4 flex justify-between items-center">
            {displaySteps}
        </div>
    );
}

export default Stepper;