import { CSSProperties, FunctionComponent, ReactNode, useContext } from "react";
import cn from "classnames";
import { CropperRef, CropperFade } from "react-advanced-cropper";
import {
  getAbsoluteZoom,
  getZoomFactor,
} from "advanced-cropper/extensions/absolute-zoom";
import { Navigation } from "../Navigation/Navigation";
import "./CustomWrapper.css";
import { MainContext, MainContextProps } from "../../../context/MainContext";
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
  const { setFile, setCropped, setShowIcon }: MainContextProps =
    useContext(MainContext);
  const onZoom = (value: number, transitions?: boolean) => {
    cropper.zoomImage(getZoomFactor(state, settings, value), {
      transitions: !!transitions,
    });
  };

  async function downloadImage(imageSrc: string) {
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "final_photo.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const onCrop = () => {
    setFile(cropper?.getCanvas()?.toDataURL() || "");
    setCropped(true);
    if (cropper) downloadImage(cropper?.getCanvas()?.toDataURL() || "");
    setShowIcon(true);
  };

  const onQuitCrop = () => {
    setFile((prev) => prev);
    setCropped(true);
    setShowIcon(false);
  };

  return (
    <CropperFade className={cn("custom-wrapper", className)} visible={state}>
      {children}
      <Navigation
        className="custom-wrapper__navigation"
        zoom={absoluteZoom}
        onZoom={onZoom}
        onCrop={onCrop}
        onQuitCrop={onQuitCrop}
      />
    </CropperFade>
  );
};
