import { CSSProperties, FunctionComponent, ReactNode } from "react";
import cn from "classnames";
import { CropperRef, CropperFade } from "react-advanced-cropper";
import {
  getAbsoluteZoom,
  getZoomFactor,
} from "advanced-cropper/extensions/absolute-zoom";
import { Navigation } from "../Navigation/Navigation";
import "./CustomWrapper.css";
interface Props {
  cropper: CropperRef;
  className?: string | undefined;
  style?: CSSProperties | undefined;
  children?: ReactNode;
}
export const CustomWrapper: FunctionComponent<Props> = ({
  cropper,
  children,
  className,
}) => {
  const state = cropper.getState();
  const settings = cropper.getSettings();
  const absoluteZoom = getAbsoluteZoom(state, settings);
  const onZoom = (value: number, transitions?: boolean) => {
    cropper.zoomImage(getZoomFactor(state, settings, value), {
      transitions: !!transitions,
    });
  };

  return (
    <CropperFade className={cn("custom-wrapper", className)} visible={state}>
      {children}
      <Navigation
        className="custom-wrapper__navigation"
        zoom={absoluteZoom}
        onZoom={onZoom}
      />
    </CropperFade>
  );
};
