import { CoursePart } from "../types";
import { FC } from "react";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: FC<{ parts: CoursePart }> = ({ parts }) => {
  switch (parts.type) {
    case "normal":
      return (
        <li>
          {parts.name} {parts.exerciseCount} {parts.description}
        </li>
      );

    case "groupProject":
      return (
        <li>
           {parts.name} {parts.exerciseCount} {parts.groupProjectCount}
        </li>
      );

    case "submission":
      return (
        <li>
          {" "}
          {parts.name}{parts.exerciseCount} {parts.description}{" "}
          {parts.exerciseSubmissionLink}
        </li>
      );

    case "special":
      return (
        <li>
           {parts.name} {parts.exerciseCount} {parts.description}{" "}
          <>
          <ul>
            {parts.requirements.map((a: string) => {
              return (
                <>
                  <li>{a}</li>
                </>
              );
            })}
            </ul>
          </>
        </li>
      );

    default:
      return assertNever(parts);
  }
};

export default Part;
