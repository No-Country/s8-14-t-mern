import { ReactElement, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Title, Subtitle, Text } from "@tremor/react";
import { ArrowLeftIcon } from "@heroicons/react/solid";

interface Props {
  title: string;
  children?: ReactNode;
}
function HeaderBackButton({ title, children, ...rest }: Props): ReactElement {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };
  return (
    <header className="pt-4 px-4 flex justify-between items-center" {...rest}>
      <button onClick={handleBackButton}>
        <ArrowLeftIcon className="w-6 h-6" />
      </button>
      <Title className="text-lg text-[#262727]">{title}</Title>
      <div>{children}</div>
    </header>
  );
}

export default HeaderBackButton;
