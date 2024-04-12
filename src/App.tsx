import { useCallback, useEffect, useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import AddPhotoIcon from "./assets/icons/AddPhotoIcon.svg";
import UploadIcon from "./assets/icons/UploadIcon.svg";
import AllDoneIcon from "./assets/icons/AllDoneIcon.svg";
import "./App.css";
import { Layout } from "./components/layout";
import { CropperRef, FixedCropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { Button } from "./components/ui/Button/Button";
import Dropzone, { FileWithPath } from "react-dropzone";
import { CustomCropper } from "./components/Cropper/CustomCropper";
import { Select } from "./components/ui/Select/Select";

function App() {
  const cropperRef = useRef<FixedCropperRef>(null);
  const [file, setFile] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [cropped, setIsCropped] = useState<boolean>(false);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(URL.createObjectURL(e.target.files[0]));
  };
  const onChange = (cropper: CropperRef) => {
    console.log(cropper.getCoordinates(), cropper.getCanvas());
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
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    acceptedFiles.map((file) => {
      const image = new Image();
      image.addEventListener("load", () => {
        // only select images within width/height limits
        const { width, height } = image;
        if (width < 200 || height < 200) {
          alert("Зображення має бути мінімум 200px*200px");
          setIsValid(false);
          return false;
        } else if (
          height > 200 &&
          height <= 8192 &&
          width > 200 &&
          width <= 8192
        ) {
          setIsValid(true);
          return true;
        }
      });
      image.src = URL.createObjectURL(file);
      setFile(URL.createObjectURL(file));
    });
  }, []);

  const onCrop = () => {
    const cropper = cropperRef?.current;
    setFile(cropper?.getCanvas()?.toDataURL() || "");
    setIsCropped(true);
    if (cropper) downloadImage(cropper?.getCanvas()?.toDataURL() || "");
    setShowIcon(true);
  };

  useEffect(() => {
    const fileUpload = document.getElementById(
      "dropzone-file"
    ) as HTMLInputElement;
    const reader = new FileReader();
    fileUpload?.addEventListener("change", () => {
      reader.readAsDataURL(
        fileUpload.files ? fileUpload?.files[0] : new Blob()
      );
      reader.onload = (e) => {
        const image = new Image();
        if (e.target?.result) {
          image.src = e.target.result.toString();
        }
        image.onload = () => {
          const { height, width } = image;
          if (height < 200 || width < 200) {
            alert("Зображення має бути мінімум 200px*200px");
            setIsValid(false);
            return false;
          }
          setIsValid(true);
          return true;
        };
      };
    });
  }, [file, isValid]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowIcon(false);
    }, 3000);
    return () => {
      clearTimeout(timeId);
    };
  }, [cropped]);
  return (
    <Layout>
      <div className="flex items-start gap-10 justify-center w-full mt-10">
        {file && isValid ? (
          <div className="flex flex-col">
            {!cropped ? (
              <>
                <CustomCropper
                  stencilSize={{ height: 300, width: 300 }}
                  src={file}
                  onChange={onChange}
                  ref={cropperRef}
                  className={"cropper"}
                />
                <Button classNames="bg-gray-200" onClick={onCrop}>
                  Обрізати
                </Button>
              </>
            ) : (
              <div className="flex items-center justify-center">
                <img
                  src={file}
                  alt="photo"
                  className="rounded-lg w-md-1 h-[291px] relative"
                />

                {showIcon && (
                  <img src={AllDoneIcon} alt="done" className="absolute done" />
                )}
              </div>
            )}
          </div>
        ) : (
          <Dropzone
            accept={{
              "image/jpeg": [],
              "image/png": [],
              "image/heif": [],
              "image/heic": [],
              "image/jpg": [],
              "image/svg": [],
            }}
            maxFiles={1}
            maxSize={20000000}
            onDrop={onDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center"
                {...getRootProps()}
              >
                <div className="flex flex-col items-center justify-center w-md-1 h-md-1 bg-lightgray rounded-t-lg">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <img
                      src={AddPhotoIcon}
                      alt="icon"
                      className="h-[85px] w-[85px]"
                    />
                  </div>
                </div>

                <div className="bg-lightblue rounded-b-lg w-md-1 h-sm flex gap-4 items-center">
                  <img src={UploadIcon} alt="upload" className="h-5 w-5 ml-5" />
                  <p className="text-lightgray font-medium text-[10px] max-w-[116px] text-left">
                    Обличчя. До 20МБ 200*200 - 8192*8192px jpeg, jpg, png, heic,
                    heif
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  max={1}
                  accept="image/png, image/jpeg, image/jpg , image/heic, image/heif"
                  onChange={handleChange}
                  {...getInputProps()}
                  className="hidden"
                />
              </label>
            )}
          </Dropzone>
        )}
        <div>
          <h1 className="text-deepblue text-sm mb-1">Паління</h1>
          <Select />
        </div>
      </div>
    </Layout>
  );
}

export default App;
