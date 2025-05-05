import React from "react";
import thstyle from "./tabssteps.module.css";
import { clsx } from "clsx";

interface TabsStepsProps {
  tab: number;
}

const steps = [
  "Dados Gerais",
  "Endereço",
  "Credenciais & Pagamento",
];

export default function TabsSteps({ tab }: TabsStepsProps) {
  return (
    <div className={thstyle.container}>
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = tab === stepNum;
        const isPassed = tab > stepNum;

        return (
          <React.Fragment key={stepNum}>
            <div className={thstyle.stepContainer}>
              <p
                className={clsx(
                  "textBgTransition",
                  thstyle.step,
                  isActive && thstyle.active,
                  isPassed && thstyle.passed
                )}
              >
                <span
                  className={clsx(
                    "textBgTransition",
                    thstyle.number,
                    isActive && thstyle.active,
                    isPassed && thstyle.passed
                  )}
                >
                  {stepNum}
                </span>
                <span className="hidden md:inline">{label}</span>
              </p>
            </div>
            {stepNum < steps.length && (
              <div
                className={clsx(
                  "flex-grow h-0.5",
                  tab > stepNum ? "bg-green-200" : "bg-gray-300"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}