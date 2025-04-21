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
      // 출품작 가져오기
      const res = await api.get(`/novel/submitted?status=submitted`); // 경로 수정
      const data = res.data;

      console.log("출품된 작품 전체 데이터:", data); // 유저의 id와 출품작의 회차에 참여한 작가가 일치 할 때 테이블 표시 해야함 // authorId?

      // 조건: 출품된 작품이면서 내가 쓴 작품만 필터링
      // const filtered = data.filter(
      //   (x: any) => x.status === "submitted" && x.authorId === user.id
      // );

      const mapped = data.map((x: any) => ({
        key: x.id,
        id: x.id,
        title: x.title,
        date: new Date(x.created_at).toLocaleDateString(), // 작품 등록일? 출품일?
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
      title: "출품일",
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
              // router.push(
              //   `/noveldetail/novelcheck/${id}?isPublished=${isPublished}` // 상세페이지 이동
              // );
            },
            style: { cursor: "pointer" },
          };
        }}
      />
    </MypageSubmissionStyled>
  );
};

export default MypageSubmission;
