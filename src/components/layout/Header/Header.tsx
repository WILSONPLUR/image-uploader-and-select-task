import Logo from "../../../assets/logo.svg";

export const Header = () => {
  return (
    <header className="bg-seablue">
      <div className="flex items-center ml-20">
        <a href="#">
          <img src={Logo} alt="logo" className="py-10" />
        </a>
      </div>
    </header>
  );
};
