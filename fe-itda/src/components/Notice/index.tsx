import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse; // Panel을 Collapse에서 가져옴

interface Props {
  title: string;
  items: {
    key: string;
    title: string;
    content: string;
    priorityLabel?: string;
  }[];
  onChange?: (keys: string | string[]) => void; // onChange를 props로 받음
}

const DropdownList = ({ title, items, onChange }: Props) => {
  return (
    <div className="drop-box">
      <h2 className="drop-title">{title}</h2>
      <Collapse expandIconPosition="end" onChange={onChange}>
        {items.map((item) => (
          <Panel
            key={item.key}
            header={
              item.priorityLabel
                ? `[${item.priorityLabel}] ${item.title}`
                : item.title
            }
          >
            <p>{item.content}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default DropdownList;
