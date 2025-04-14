import DropdownList from "@/components/Notice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const alertItems = [
  {
    key: "1",
    title: "This is panel header 1",
    content: "오늘 하루는 어떠신가요?",
    date: "2025.03.22",
  },
  {
    key: "2",
    title: "This is panel header 2",
    content: "블랙리스트가 되셨습니다.",
    date: "2025.03.22",
  },
  {
    key: "3",
    title: "This is panel header 3",
    content: "집에 가고 싶나요?",
    date: "2025.03.22",
  },
];

const AlertPage = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // 로그인 안 되어있으면 로그인 페이지로 이동
    }
  }, [user, router]);

  if (!user) return null;

  // 알림 내용보기 상태
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  const handleCollapseChange = (keys: string | string[]) => {
    console.log("현재 열린 패널:", keys);
    setActiveKeys(Array.isArray(keys) ? keys : [keys]); // 한 개의 패널만 선택할 때는 배열로 받지 않고 문자열로 받기 때문에 배열로 만들어주는 것
  };

  return (
    <DropdownList
      title="알림"
      items={alertItems}
      onChange={handleCollapseChange}
    />
  );
};

export default AlertPage;
