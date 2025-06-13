import { Table } from "antd";
import { MyPageReadStyled } from "./styled";
import { useEffect, useState } from "react";
import clsx from "clsx";
import api from "@/utill/api";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";

const MyPageRead = () => {
  const [reads, setReads] = useState<any[]>([]);
  const router = useRouter();

  // 로그인 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);

  const getReadList = async () => {
    if (!user) return;

    try {
      const res = await api.get("/novels/recent");

      const mapped = res.data.map((x: any) => ({
        key: `${x.novelId}-${x.id}`, // 최근 본 기록 ID 등으로 유니크 key 생성
        novelId: x.novelId,
        chapterNumber: x.chapterNumber, // 백엔드에 실제 존재하는 필드명
        title: x.novelTitle,
        date: new Date(x.viewedAt).toLocaleDateString(),
      }));

      setReads(mapped);
    } catch (err) {
      console.error("최근 읽은 작품 불러오기 실패", err);
    }
  };

  useEffect(() => {
    if (user) {
      getReadList();
    }
  }, [user]);

  const columns = [
    {
      title: "작품명",
      dataIndex: "title",
      key: "title",
      width: "50%",
    },
    {
      title: "회차",
      dataIndex: "episodeNum",
      key: "episodeNum",
      width: "20%",
    },
    {
      title: "감상 날짜",
      dataIndex: "date",
      key: "date",
      width: "30%",
    },
  ];
  return (
    <MyPageReadStyled className={clsx("mypageread-wrap")}>
      <Table
        columns={columns}
        dataSource={reads}
        rowKey="key"
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/noveldetail/novelcheck/${record.novelId}`);
            },
          };
        }}
        rowClassName="mypageread-row"
      />
    </MyPageReadStyled>
  );
};

export default MyPageRead;
