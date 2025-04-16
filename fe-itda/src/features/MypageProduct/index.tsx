import { Table } from "antd";
import { MypageProductStyled } from "./styled";
import clsx from "clsx";

// interface CommentData {
//   key: number;
//   index: number;
//   title: string;
//   createdAt: string;
// }

const columns = [
  {
    title: "번호",
    dataIndex: "index",
    width: "20%",
  },
  {
    title: "제목",
    dataIndex: "title",
    width: "50%",
  },
  {
    title: "작성 날짜",
    dataIndex: "createdAt",
    width: "30%",
  },
];

const MypageProduct = () => {
  return (
    <MypageProductStyled className={clsx("mypage-product")}>
      <Table
        columns={columns}
        // dataSource={}
        rowKey="id"
        pagination={false}
        bordered
        locale={{
          emptyText: "출품된 작품이 없습니다. ",
        }}
      />
    </MypageProductStyled>
  );
};

export default MypageProduct;
