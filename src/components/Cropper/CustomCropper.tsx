import { forwardRef } from "react";
import {
  ImageRestriction,
  FixedCropper,
  FixedCropperRef,
  FixedCropperProps,
} from "react-advanced-cropper";
import { CustomWrapper } from "./Wrapper/CustomWrapper";
export type CustomCropperProps = FixedCropperProps;
export type CustomCropperRef = FixedCropperRef;
export const CustomCropper = forwardRef<CustomCropperRef, CustomCropperProps>(
  ({ stencilProps, ...props }: CustomCropperProps, ref) => {
    return (
      <FixedCropper
        ref={ref}
        stencilProps={{
          handlers: false,
          lines: false,
          movable: false,
          resizable: false,
          ...stencilProps,
        }}
        // backgroundComponent={null}
        imageRestriction={ImageRestriction.fillArea}
        wrapperComponent={CustomWrapper}
        {...props}
      />
    );
  }
);
CustomCropper.displayName = "CustomCropper";
