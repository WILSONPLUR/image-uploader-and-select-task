import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface MainContextProps {
  file: string | null;
  setFile: Dispatch<SetStateAction<string | null>>;
  cropped: boolean;
  setCropped: Dispatch<SetStateAction<boolean>>;
  showIcon: boolean;
  setShowIcon: Dispatch<SetStateAction<boolean>>;
}

export const MainContext = createContext<MainContextProps>({
  file: "",
  setFile: () => {},
  cropped: false,
  setCropped: () => {},
  showIcon: false,
  setShowIcon: () => {},
});

const MainContextWrapper = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<string | null>("");
  const [cropped, setCropped] = useState<boolean>(false);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  return (
    <MainContext.Provider
      value={{ file, setFile, cropped, setCropped, showIcon, setShowIcon }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextWrapper;
