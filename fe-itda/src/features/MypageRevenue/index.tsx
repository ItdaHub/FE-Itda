import { Button, Modal, Table } from "antd";
import { MypageRevenueStyled, PopcornModal } from "./styled";
import clsx from "clsx";
import { useState } from "react";

const columns = [
  {
    title: "번호",
    dataIndex: "index",
    width: "20%",
  },
  {
    title: "제목",
    dataIndex: "title",
    width: "30%",
  },
  {
    title: "팝콘(인당)",
    dataIndex: "createdAt",
    width: "20%",
  },
  {
    title: "수익 날짜",
    dataIndex: "createdAt",
    width: "30%",
  },
];

const MypageRevenue = () => {
  const [popModalOpen, setPopModalOpen] = useState(false);

  const handlePopOpen = () => {
    setPopModalOpen(true);
  };

  const handlePopClose = () => {
    setPopModalOpen(false);
  };

  return (
    <MypageRevenueStyled className={clsx("mypage-revenue")}>
      <div className="popcorn-box">
        <Button
          type="primary"
          onClick={() => {
            handlePopOpen();
          }}
        >
          팝콘 교환
        </Button>
      </div>

      {/* 팝콘 모달 */}
      <PopcornModal
        className="popcorn-modal"
        open={popModalOpen}
        onCancel={handlePopClose}
        footer={null}
        centered
        width={450}
      >
        <div className="popcorn-modal-container">
          <div className="price">
            <p>총 금액</p>
            <p>10,000</p>
            <p>원</p>
          </div>
          <div className="account-number">
            <input
              className="input-number"
              placeholder="계좌번호를 입력해주세요"
            />
          </div>
          <div>
            <button>교환</button>
          </div>
        </div>
      </PopcornModal>

      <Table
        columns={columns}
        // dataSource={}
        rowKey="id"
        pagination={false}
        bordered
        locale={{
          emptyText: "현재 수익이 없습니다. ",
        }}
      />
    </MypageRevenueStyled>
  );
};

export default MypageRevenue;
