import { useEffect, useState } from "react";
import { Table } from "antd";

import clsx from "clsx";
import api from "@/utill/api";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { MypageSubmissionStyled } from "./styled";

const MypageSubmission = () => {
  const [exhibits, setExhibits] = useState<any[]>([]);
  const router = useRouter();

  // 로그인 유저 정보 가져오기
  const user = useAppSelector((state) => state.auth.user);

  const getExhibitList = async () => {
    if (!user) return;

    try {
      // 내가 작성한 글 가져오기
      const res = await api.get("/novels/my");
      const data = res.data;

      // 출품된 작품만 필터링
      const filtered = data.filter((x: any) => x.status === "submitted");

      const mapped = data.map((x: any) => ({
        key: x.id,
        id: x.id,
        title: x.title,
        date: new Date(x.created_at).toLocaleDateString(),
        status: x.status,
      }));

      setExhibits(mapped);
    } catch (err) {
      console.error("출품 작품 불러오기 실패", err);
    }
  };

  useEffect(() => {
    getExhibitList();
  }, [user]);

  const columns = [
    {
      title: "번호",
      dataIndex: "index",
      render: (_: any, __: any, index: number) => index + 1,
      width: "20%",
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      width: "50%",
    },
    {
      title: "작성일",
      dataIndex: "date",
      key: "date",
      width: "30%",
    },
  ];

  return (
    <MypageSubmissionStyled className={clsx("mypage-submission")}>
      <Table
        columns={columns}
        dataSource={exhibits}
        rowKey="id"
        onRow={(record) => {
          return {
            onClick: () => {
              router.push(`/noveldetail/novelcheck/${record.id}`);
            },
          };
        }}
        rowClassName="submission-row"
      />
    </MypageSubmissionStyled>
  );
};

export default MypageSubmission;
