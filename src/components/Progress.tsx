import React, { FC } from "react";
import { Progress } from "@telegram-apps/telegram-ui";
import { StaticImageData } from "next/image";

interface ProgressProps {
    value: number;
    image: StaticImageData;
    color: string;
    width: number;
}

const ProgressComponent: FC<ProgressProps> = ({ value, image, color, width }) => {
    return (
      <div
        className={`border-8 border-solid border-black rounded-full w-${width} h-24 bg-white bg-opacity-50 px-6 pt-1`}
      >
        <div className="flex items-center">
          <img src={image.src} alt="image" className="w-10 h-10 m-2 mb-0" />
          <div className={`text-4xl font-bold text-black`}>{value}</div>
        </div>
        <div className="relative pt-1">
          <div
            className={`overflow-hidden h-2 m-2 text-xs flex rounded bg-white`}
          >
            <div
              style={{ width: `${value/100}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black`}
            ></div>
          </div>
        </div>
      </div>
    );
};

export default ProgressComponent;
