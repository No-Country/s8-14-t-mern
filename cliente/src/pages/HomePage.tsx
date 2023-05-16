import { Card } from "@tremor/react";
import { Outlet } from "react-router-dom";
export default function HomePage(): JSX.Element {
  return (
    <div>
      HomePage<Card>card</Card>
      <Outlet />
    </div>
  );
}
