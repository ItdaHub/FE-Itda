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
      // 내가 최근 본 소설 가져오기
      const res = await api.get("/novels/myread");

      const mapped = res.data.map((x: any) => ({
        key: x.id,
        id: x.id,
        title: x.title, // 작품명
        episodeNum: x.episodeNum, // 회차
        readDate: x.readDate, // 감상 날짜
      }));

      setReads(mapped);
    } catch (err) {
      console.error("최근 읽은 작품 불러오기 실패", err);
    }
  };

  useEffect(() => {
    getReadList();
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
        rowKey="id"
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/noveldetail/novelcheck/${record.id}`);
            },
          };
        }}
        rowClassName="mypageread-row"
      />
    </MyPageReadStyled>
  );
};

export default MyPageRead;
