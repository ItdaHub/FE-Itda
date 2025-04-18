import React from "react";
import { Collapse } from "antd";
const { Panel } = Collapse; // Panel을 Collapse에서 가져옴
import { NoticeStyled } from "./styled";
import clsx from "clsx";

interface DropdownListProps {
  title: string;
  items: {
    key: string;
    title: string;
    content: string;
    priorityLabel?: string;
    date: string;
  }[];
  onChange?: (keys: string | string[]) => void;
}

const DropdownList = ({ title, items, onChange }: DropdownListProps) => {
  return (
    <NoticeStyled className={clsx("notice-wrap")}>
      <div className="notice-box">
        <h2 className="notice-title">{title}</h2>
        <div className="collapse-wrap">
          <Collapse
            className="collapse"
            expandIconPosition="end"
            onChange={onChange}
          >
            {/* <div className="collapse"> */}
            {items.map((item, index) => (
              <Panel
                key={item.key}
                header={
                  // item.priorityLabel
                  //   ? `[${item.priorityLabel}] ${item.title}`
                  //   : item.title
                  item.priorityLabel ? (
                    //priorityLabel이 있을 때
                    <div className="dropdown-header">
                      <div className="dropdown-header-title">
                        <span className={`label ${item.priorityLabel}`}>
                          [{item.priorityLabel}]
                        </span>
                        <span>{item.title}</span>
                      </div>
                      <div className="dropdown-header-date">
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ) : (
                    //priorityLabel이 없을 때 (넘버링 스타일)
                    <div className="dropdown-header">
                      <div className="dropdown-header-title">
                        <span className="label no-priority">{index + 1}</span>
                        <span>{item.title}</span>
                      </div>
                      <div className="dropdown-header-date">
                        <span>{item.date}</span>
                      </div>
                    </div>
                  )
                }
              >
                <p>{item.content}</p>
              </Panel>
            ))}
            {/* </div> */}
          </Collapse>
        </div>
      </div>
    </NoticeStyled>
  );
};

export default DropdownList;
