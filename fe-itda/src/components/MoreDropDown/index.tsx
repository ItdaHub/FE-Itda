import { Dropdown, Input, MenuProps, Modal } from "antd";
import { MoreDropDwonStyled } from "./styled";
import { ExclamationCircleOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import api from "@/utill/api";
import clsx from "clsx";
import { App as AntdApp } from "antd";

interface MoreDropProps {
  target_type?: "comment" | "chapter";
  type?: string;
  user: any;
  item?: any;
  isVisible: boolean;
  setIsVisible: any;
  refreshComments?: () => Promise<void>;
  novelId?: number;
  chapterId?: number;
}

const MoreDropDown = ({
  target_type,
  type,
  user,
  item,
  isVisible,
  setIsVisible,
  refreshComments,
  novelId,
  chapterId,
}: MoreDropProps) => {
  const { message } = AntdApp.useApp();

  // 모달 상태 관리
  const [declareModalOpen, setDeclareModalOpen] = useState(false); // 신고 모달 열림 여부
  const [reportReason, setReportReason] = useState(""); // 신고 사유 상태
  const [reportedItems, setReportedItems] = useState<number[]>([]);

  // 신고 모달 띄우기
  const OpenModal = () => {
    setDeclareModalOpen(true);
    setReportReason(""); // 모달 닫기 시 신고 사유 초기화
  };

  // 신고 제출 핸들러
  // 신고 완료 후, 신고된 항목을 상태에 추가
  const handleReportSubmit = async () => {
    if (!reportReason) {
      message.error("신고 사유를 입력해주세요.");
      return;
    }

    if (reportedItems.includes(item.id)) {
      message.error("이미 신고한 콘텐츠입니다.");
      return;
    }

    // 신고하기 요청
    Modal.confirm({
      title: "신고하시겠습니까?",
      icon: <ExclamationCircleOutlined />,
      content: "신고는 한번만 가능합니다.",
      okText: "예",
      cancelText: "아니오",
      okButtonProps: {
        style: { backgroundColor: "#c47ad7" },
      },
      async onOk() {
        try {
          const target =
            target_type === "comment"
              ? `/reports/comments/${item.id}` // 댓글 신고
              : `/reports/chapters/${chapterId}`; // 소설 신고

          // axios 신고 요청
          const response = await api.post(target, {
            reason: reportReason,
          });

          // 신고 성공 시
          message.success("신고가 완료되었습니다.");
          setReportedItems([...reportedItems, item.id]); // 신고한 항목 추가
          setDeclareModalOpen(false); // 신고 후 모달 닫기
        } catch (e: any) {
          console.error("신고 실패: ", e);
          const messageFromBackend = e?.response?.data?.message;

          if (
            messageFromBackend ===
            "이미 해당 콘텐츠에 대해 신고한 이력이 있습니다."
          ) {
            message.error("이미 신고한 콘텐츠입니다.");
            setReportedItems([...reportedItems, item.id]); // 상태에 추가하여 중복 방지
            setDeclareModalOpen(false); // 모달 닫기
          } else if (messageFromBackend === "댓글을 찾을 수 없습니다.") {
            message.error("해당 댓글을 찾을 수 없습니다.");
          } else {
            message.error("신고에 실패했습니다.");
          }
        }
      },
    });
  };

  // 삭제하기 요청
  const deleteComment = async () => {
    Modal.confirm({
      title: "삭제하시겠습니까?",
      content: "삭제한 내용은 복구할 수 없습니다.",
      okText: "삭제",
      cancelText: "취소",
      okButtonProps: {
        style: { backgroundColor: "#c47ad7" },
      },
      async onOk() {
        try {
          // axios 댓글 삭제 요청
          await api.delete(`/comments/${item.id}`);
          message.success("댓글이 삭제되었습니다.");
          refreshComments?.();
        } catch (e) {
          console.error("댓글 삭제 실패: ", e);
          message.error("댓글 삭제에 실패했습니다.");
        }
      },
    });
  };

  // 모달 취소 핸들러
  const CloseModal = () => {
    setDeclareModalOpen(false); // 모달 닫기
    setReportReason(""); // 모달 닫기 시 신고 사유 초기화
  };

  const itemDelete: MenuProps["items"] = [
    {
      label: <div onClick={deleteComment}>삭제</div>,
      key: "0",
    },
  ];

  const itemDeclare: MenuProps["items"] = [
    {
      label: <div onClick={OpenModal}>신고</div>,
      key: "1",
    },
  ];

  return (
    <MoreDropDwonStyled className={clsx("more-wrap")}>
      <Dropdown
        menu={{
          items: user?.nickname === item.writer ? itemDelete : itemDeclare,
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()}>
          <div className="more">
            <MoreOutlined />
          </div>
        </a>
      </Dropdown>

      {/* 신고 모달 */}
      <Modal
        title={target_type === "comment" ? "댓글 신고" : "소설 신고"}
        open={declareModalOpen}
        onOk={handleReportSubmit} // 신고하기 버튼 클릭 시 제출
        onCancel={CloseModal} // 취소 버튼 클릭 시 모달 닫기
        okText="신고하기"
        cancelText="취소"
        centered
      >
        <div>
          <Input.TextArea
            rows={4}
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)} // 신고 사유 입력
            placeholder="신고 사유를 입력해주세요."
          />
          <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
            ! 불법적인 내용이거나, 서비스 이용 목적에 부합하지 않는{" "}
            {target_type === "comment" ? "댓글" : "소설"}을 신고해주세요.
            신고하신 {target_type === "comment" ? "댓글" : "소설"}은 운영정책에
            따라 처리되며, 허위 신고시 이용에 제한을 받을 수 있습니다.
          </div>
        </div>
      </Modal>
    </MoreDropDwonStyled>
  );
};

export default MoreDropDown;
