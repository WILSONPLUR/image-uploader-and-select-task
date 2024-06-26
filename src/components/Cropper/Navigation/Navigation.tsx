import { FC } from "react";
import cn from "classnames";
import { isNumber } from "advanced-cropper";
import { Slider } from "../Slider/Slider";
import "./Navigation.css";
import PlusIcon from "../../../assets/icons/PlusIcon.svg";
import MinusIcon from "../../../assets/icons/MinusIcon.svg";
import DoneIcon from "../../../assets/icons/DoneIcon.svg";
import QuitIcon from "../../../assets/icons/QuitIcon.svg";

interface Props {
  zoom?: number;
  onZoom?: (value: number, transitions?: boolean) => void;
  onCrop?: () => void;
  onQuitCrop?: () => void;
  className?: string;
  disabled?: unknown;
}

export const Navigation: FC<Props> = ({
  className,
  onZoom,
  onCrop,
  onQuitCrop,
  zoom,
}) => {
  const onZoomIn = () => {
    if (onZoom && isNumber(zoom)) {
      onZoom(Math.min(1, zoom + 0.1), true);
    }
  };

  const onZoomOut = () => {
    if (onZoom && isNumber(zoom)) {
      onZoom(Math.max(0, zoom - 0.1), true);
    }
  };

  return (
    <div className={cn("absolute-zoom-cropper-navigation", className)}>
      <div className="absolute-zoom-cropper-navigation-container">
        <button onClick={onQuitCrop}>
          <img
            src={QuitIcon}
            alt="quit cropping"
            className="w-[19px] h-[19px]"
          />
        </button>
        <button
          className="absolute-zoom-cropper-navigation__button"
          onClick={onZoomOut}
        >
          <img src={MinusIcon} alt="zoom-out" className="w-[10px] h-[19px]" />
        </button>
        <Slider
          value={zoom}
          onChange={onZoom}
          className="absolute-zoom-cropper-navigation__slider"
        />
        <button
          className="absolute-zoom-cropper-navigation__button"
          onClick={onZoomIn}
        >
          <img src={PlusIcon} alt="zoom-in" className="w-[10px] h-[19px]" />
        </button>
        <button onClick={onCrop}>
          <img
            src={DoneIcon}
            alt="done cropping"
            className="w-[19px] h-[19px]"
          />
        </button>
      </div>
    </div>
  );
};
