import MainPage from "@/features/MainPageManager/MainPage";
import { FloatButton } from "antd";

const Main = () => {
  return (
    <>
      <MainPage />
      <FloatButton.BackTop visibilityHeight={0} />
    </>
  );
};

export default Main;
