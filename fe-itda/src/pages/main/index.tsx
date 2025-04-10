import CreateIcon from "@mui/icons-material/Create";
import MainPage from "@/features/MainPageManager/MainPage";
import { FloatButton } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Main = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // 처음 로드 시
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <MainPage />
      {isMobile ? (
        <FloatButton
          icon={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <CreateIcon style={{ fontSize: 20 }} />
            </div>
          }
          type="primary"
          style={{ right: 20, bottom: 80 }}
          onClick={() => router.push(`/newwrite?type="new"`)}
        />
      ) : (
        <FloatButton.BackTop visibilityHeight={0} style={{ bottom: 80 }} />
      )}
    </>
  );
};

export default Main;
