import { CoursePart } from "../types";
import { FC } from "react";

const Total: FC<{ parts: CoursePart[] }> = (parts) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};
export default Total;
