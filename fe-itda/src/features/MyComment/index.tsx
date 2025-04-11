import { Table, Button } from "antd";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { MyCommentStyled } from "./styled";
import clsx from "clsx";
import { App as AntdApp } from "antd";

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
  const { message } = AntdApp.useApp();
  const [dataSource, setDataSource] = useState<CommentData[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const generateFakeComments = () => {
    const fakeComments = [
      {
        id: 1,
        content: "이 작품 너무 좋네요! 강추합니다.",
        createdAt: "2025-04-07 12:00",
        locationId: "작품 A / 1화",
      },
      {
        id: 2,
        content: "아쉬운 부분도 있지만 꽤 괜찮은 작품이에요.",
        createdAt: "2025-04-06 10:30",
        locationId: "작품 B / 3화",
      },
      {
        id: 3,
        content: "생각보다 지루하지 않았어요. 재밌게 봤습니다.",
        createdAt: "2025-04-05 08:45",
        locationId: "작품 C / 5화",
      },
      {
        id: 4,
        content: "별로였어요. 추천하지 않습니다.",
        createdAt: "2025-04-04 18:20",
        locationId: "작품 D / 2화",
      },
    ];

    const tableData = fakeComments.map((comment, index) => ({
      key: comment.id,
      index: index + 1,
      content: comment.content,
      createdAt: comment.createdAt,
      locationId: comment.locationId,
    }));

    setDataSource(tableData);
  };

  useEffect(() => {
    generateFakeComments();
  }, []);

  const handleDelete = () => {
    const filtered = dataSource.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    setDataSource(filtered);
    setSelectedRowKeys([]); // 선택 초기화
    message.success("선택한 댓글이 삭제되었습니다.");
  };
  // const handleDelete = async () => {
  //   try {
  //     await api.delete("/auth/comments", {
  //       data: { selectedRowKeys }, // body에 ID 배열 전달
  //     });

  //     // 로컬에서도 삭제
  //     const filtered = dataSource.filter(
  //       (item) => !selectedRowKeys.includes(item.key)
  //     );
  //     setDataSource(filtered);
  //     setSelectedRowKeys([]);
  //     message.success("선택한 댓글이 삭제되었습니다.");
  //   } catch (error) {
  //     console.error("댓글 삭제 실패", error);
  //     message.error("댓글 삭제에 실패했습니다.");
  //   }
  // };

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

// import clsx from "clsx";
// import { MyCommentStyled } from "./styled";
// import { useEffect, useState } from "react";
// import { useAppSelector } from "../../store/hooks";
// import api from "@/utill/api";
// import { Table, message } from "antd";
// import type { TableColumnsType, TableProps } from "antd";

// type TableRowSelection<T extends object = object> =
//   TableProps<T>["rowSelection"];

// interface DataType {
//   // key: React.Key;
//   key: number;
//   index: number; // 넘버 증가
//   content: string;
//   createdAt: string;
//   locationId: string; // 작품 또는 회차 ID
// }

// const columns: TableColumnsType<DataType> = [
//   {
//     title: "번호",
//     dataIndex: "index",
//     width: "10%",
//   },
//   {
//     title: "댓글 내용",
//     dataIndex: "content",
//     width: "40%",
//   },
//   {
//     title: "작성 날짜",
//     dataIndex: "createdAt",
//     width: "25%",
//   },
//   {
//     title: "위치 (작품/회차 ID)",
//     dataIndex: "locationId",
//     width: "25%",
//   },
// ];

// const dataSource = Array.from({ length: 16 }).map<DataType>((_, i) => ({
//   key: i,
//   name: `${i}`,
//   age: 32,
//   address: `London, Park Lane no. ${i}`,
// }));

// const MyComment: React.FC = () => {
//   const [dataSource, setDataSource] = useState<DataType[]>([]);
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

//   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//     console.log("selectedRowKeys changed: ", newSelectedRowKeys);
//     setSelectedRowKeys(newSelectedRowKeys);
//   };

//   const rowSelection: TableRowSelection<DataType> = {
//     selectedRowKeys,
//     onChange: onSelectChange,
//     selections: [
//       Table.SELECTION_ALL,
//       Table.SELECTION_INVERT,
//       Table.SELECTION_NONE,
//     ],
//   };

//   return (
//     <MyCommentStyled className={clsx("mycomment-wrap")}>
//       <Table<DataType>
//         //   rowSelection={rowSelection}
//         //   columns={columns}
//         //   dataSource={dataSource}
//         // /> columns={columns}
//         dataSource={dataSource}
//         pagination={false}
//         rowSelection={{
//           onChange: (selectedRowKeys) => {
//             console.log("선택된 row:", selectedRowKeys);
//           },
//         }}
//       />
//     </MyCommentStyled>
//   );
// };

// export default MyComment;

// const MyComment = () => {
//   const user = useAppSelector((state) => state.auth.user); // 로그인된 사용자 정보

//   const [comments, setComments] = useState<any[]>([]);
//   const [selectedComments, setSelectedComments] = useState<number[]>([]); // 선택한 댓글들

//   // // 내 댓글 가져오기
//   // const getMyComments = async () => {
//   //   try {
//   //     const response = await api.get(`/comments`); // 백엔드에서 내 댓글을 가져오는 API 호출
//   //     setComments(response.data.comments); // 댓글 저장
//   //   } catch (error) {
//   //     message.error("댓글을 불러오는 데 실패했습니다.");
//   //     console.error(error);
//   //   }
//   // };

//   // 임의의 댓글 데이터를 생성하는 함수
//   const generateFakeComments = () => {
//     const fakeComments = [
//       {
//         id: 1,
//         workTitle: "작품 A",
//         commentText: "이 작품 너무 좋네요! 강추합니다.",
//         createdAt: "2025-04-07 12:00",
//       },
//       {
//         id: 2,
//         workTitle: "작품 B",
//         commentText: "아쉬운 부분도 있지만 꽤 괜찮은 작품이에요.",
//         createdAt: "2025-04-06 10:30",
//       },
//       {
//         id: 3,
//         workTitle: "작품 C",
//         commentText: "생각보다 지루하지 않았어요. 재밌게 봤습니다.",
//         createdAt: "2025-04-05 08:45",
//       },
//       {
//         id: 4,
//         workTitle: "작품 D",
//         commentText: "별로였어요. 추천하지 않습니다.",
//         createdAt: "2025-04-04 18:20",
//       },
//     ];

//     setComments(fakeComments); // 임의의 댓글 데이터를 설정
//   };

//   useEffect(() => {
//     generateFakeComments(); // 컴포넌트가 마운트되면 임의의 댓글 데이터를 생성
//   }, []);

//   return (
//     <MyCommentStyled className={clsx("mycomment-wrap")}>
//       <div className="comment-head" style={{ display: "flex" }}>
//         <div>
//           <input type="checkbox" />
//         </div>
//         <div>작품 명</div>
//         <div>댓글 내용</div>
//         <div>작성 날짜</div>
//       </div>

//       {comments.length > 0 ? (
//         comments.map((comment) => (
//           <div
//             className="comment-body"
//             key={comment.id}
//             style={{ display: "flex", padding: "10px" }}
//           >
//             <div>
//               <input
//                 type="checkbox"
//                 // checked={selectedComments.includes(comment.id)}
//                 // onChange={() => handleCheckboxChange(comment.id)}
//               />
//             </div>
//             <div>{comment.workTitle}</div> {/* 작품명 */}
//             <div>{comment.commentText}</div> {/* 댓글 내용 */}
//             <div>{comment.createdAt}</div> {/* 작성 날짜 */}
//           </div>
//         ))
//       ) : (
//         <div className="no-comment">작성한 댓글이 없습니다.</div>
//       )}

//       <button>삭제</button>
//     </MyCommentStyled>
//   );
// };

// export default MyComment;
