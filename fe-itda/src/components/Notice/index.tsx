import React from "react";
import { Collapse, Empty } from "antd";
import { NoticeStyled } from "./styled";
import clsx from "clsx";

interface DropdownListProps {
  title: string;
  items: {
    key: string;
    title: string;
    content: string;
    priority?: string;
    date: string;
  }[];
  onChange?: (keys: string | string[]) => void;
  emptyMessage: string;
}

const DropdownList = ({
  title,
  items,
  onChange,
  emptyMessage,
}: DropdownListProps) => {
  const { Panel } = Collapse;

  return (
    <NoticeStyled className={clsx("notice-wrap")}>
      <div className="notice-box">
        <h2 className="notice-title">{title}</h2>
        <div className="collapse-wrap">
          <div className="collapse-wrap">
            {items.length === 0 ? (
              <div className="empty-message">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={emptyMessage}
                />
              </div>
            ) : (
              <Collapse
                className="collapse"
                expandIconPosition="end"
                onChange={onChange}
              >
                {items.map((item, index) => (
                  <Panel
                    key={item.key}
                    header={
                      item.priority ? (
                        //priorityLabel이 있을 때
                        <div className="dropdown-header">
                          <div className="dropdown-header-title">
                            <span className={`label ${item.priority}`}>
                              [{item.priority === "normal" ? "기본" : "긴급"}]
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
                            <span className="label no-priority">
                              {index + 1}
                            </span>
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
              </Collapse>
            )}
          </div>
        </div>
      </div>
    </NoticeStyled>
  );
};

export default DropdownList;
