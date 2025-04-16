import { Button, Table } from "antd";
import { MypageRevenueStyled } from "./styled";
import clsx from "clsx";

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
  return (
    <MypageRevenueStyled className={clsx("mypage-revenue")}>
      <div className="popcorn-box">
        <Button
          type="primary"
          // icon={<PlusOutlined />}
          onClick={() => {
            // router.push("/newnotice");
          }}
        >
          팝콘 교환
        </Button>
      </div>
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
