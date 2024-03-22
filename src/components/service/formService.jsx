import React, { useState } from "react";
import Stepper from "./stepper";
import StepperControl from "./stepperControl";
import Categories from "./steps/categories";
import Services from "./steps/services";
import Final from "./steps/final";

const FormService = () => {

    const [currentSteps, setCurrentSteps] = useState(1);
    const steps = [
        "Categories",
        "Services",
        "Complete"
    ];

    const displayStep = (step) => {
        switch(step) {
            case 1:
                return <Categories />
            case 2:
                return <Services />
            case 3:
                return <Final />
            default:
        }
    }

    return(
        <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
            {/* STEPPER */}
            <div className="container horizontal mt-5">
                <Stepper steps = {steps} currentSteps={currentSteps}/>
            </div>

            {/* NAVIGATIONS CONTROLS */}
            <StepperControl/>
        </div>
    );
}

export default FormService;