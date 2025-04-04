import { Modal, List, Avatar } from "antd";
import { useState } from "react";

const userProfiles = [
  {
    id: 1,
    name: "김민수",
    email: "minsu@naver.com",
    profile_img: "https://example.com/avatar1.png",
  },
  {
    id: 2,
    name: "박지현",
    email: "jihyun@naver.com",
    profile_img: "https://example.com/avatar2.png",
  },
];

export default function ProfileSelectModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSelect = (profile: {
    id: number;
    name: string;
    email: string;
    profile_img: string;
  }) => {
    console.log("선택된 프로필:", profile);
    setIsModalOpen(false);
    // 이후 페이지 이동 처리 등
  };

  return (
    <Modal
      title="사용자 프로필 선택"
      open={isModalOpen}
      footer={null}
      closable={false}
    >
      <List
        itemLayout="horizontal"
        dataSource={userProfiles}
        renderItem={(item) => (
          <List.Item
            onClick={() => handleSelect(item)}
            style={{ cursor: "pointer" }}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.profile_img} />}
              title={item.name}
              description={item.email}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
}
