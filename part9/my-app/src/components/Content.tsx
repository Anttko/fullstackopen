import { FC } from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content: FC<{ parts: Array<CoursePart> }> = ({ parts }): JSX.Element => {
  console.log(parts);
  return (
    <div>
      <>
        <h2>{parts[0].name}</h2>
      </>
      <>
        <div>
          <ul>
            {parts.map((a) => {
              return <Part key={a.name} parts={a} />;
            })}
          </ul>
        </div>
      </>
    </div>
  );
};
export default Content;
