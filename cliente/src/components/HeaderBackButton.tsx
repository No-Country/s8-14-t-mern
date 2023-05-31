import { ReactElement, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Title, Subtitle, Text } from "@tremor/react";
import { ArrowLeftIcon } from "@heroicons/react/solid";

interface Props {
  title: string;
  className?: string;
  children?: ReactNode;
}
function HeaderBackButton({
  title,
  children,
  className,
  ...rest
}: Props): ReactElement {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };
  return (
    <header
      className={`py-4 px-4 flex gap-7 items-center bg-primary text-white ${className}`}
      {...rest}
    >
      <button onClick={handleBackButton}>
        <ArrowLeftIcon className="w-6 h-6" />
      </button>
      <Title className="text-lg text-inherit">{title}</Title>
      <div>{children}</div>
    </header>
  );
}

export default HeaderBackButton;
