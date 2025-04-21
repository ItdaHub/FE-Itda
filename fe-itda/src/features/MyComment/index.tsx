import { Table, Button, Modal } from "antd";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { MyCommentStyled } from "./styled";
import clsx from "clsx";
import { App as AntdApp } from "antd";
import api from "@/utill/api";
import { useAppSelector } from "@/store/hooks";
import dayjs from "dayjs";
interface CommentData {
  key: number;
  index: number;
  content: string;
  createdAt: string;
  locationId: string;
}
const columns: TableColumnsType<CommentData> = [
  {
    title: "번호",
    dataIndex: "index",
    width: "10%",
  },
  {
    title: "댓글 내용",
    dataIndex: "content",
    width: "40%",
  },
  {
    title: "작성 날짜",
    dataIndex: "createdAt",
    width: "25%",
  },
  {
    title: "위치 (작품/회차 ID)",
    dataIndex: "locationId",
    width: "25%",
  },
];
const MyComment: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { message } = AntdApp.useApp();
  const [dataSource, setDataSource] = useState<CommentData[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const fetchMyComments = async () => {
    try {
      const response = await api.get("/comments/my-comments");
      const mappedData: CommentData[] = response.data.map(
        (comment: any, index: number) => {
          console.log(":날짜: comment.created_at:", comment.created_at);
          return {
            key: comment.id,
            index: index + 1,
            content: comment.content,
            createdAt: dayjs(comment.created_at).isValid()
              ? dayjs(comment.created_at).format("YYYY-MM-DD HH:mm:ss")
              : "날짜 없음",
            locationId: comment.chapter
              ? `${comment.novel?.title} / ${comment.chapter?.id}`
              : `${comment.novel?.title}`,
          };
        }
      );
      setDataSource(mappedData);
    } catch (error) {
      console.error("내 댓글 불러오기 실패:", error);
      message.error("내가 작성한 댓글을 불러오지 못했어요.");
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "댓글을 삭제하겠습니까?",
      content: "삭제한 내용은 복구할 수 없습니다.",
      okText: "삭제",
      cancelText: "취소",
      okButtonProps: {
        style: { backgroundColor: "#c47ad7" },
      },
      async onOk() {
        try {
          await api.delete("/comments/bulk-delete", {
            data: { ids: selectedRowKeys },
          });
          const filtered = dataSource.filter(
            (item) => !selectedRowKeys.includes(item.key)
          );
          setDataSource(filtered);
          setSelectedRowKeys([]);
          message.success("선택한 댓글이 삭제되었습니다.");
        } catch (error) {
          console.error("댓글 삭제 실패:", error);
          message.error("댓글 삭제에 실패했어요.");
        }
      },
    });
  };

  useEffect(() => {
    if (user?.id) {
      fetchMyComments();
    }
  }, [user]);

  return (
    <MyCommentStyled className={clsx("mycomment-wrap")}>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={handleDelete}
          disabled={selectedRowKeys.length === 0}
          danger
        >
          삭제
        </Button>
      </div>
      <Table<CommentData>
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowSelection={{
          selectedRowKeys,
          onChange: (newSelectedKeys) => {
            setSelectedRowKeys(newSelectedKeys);
          },
        }}
      />
    </MyCommentStyled>
  );
};
export default MyComment;
