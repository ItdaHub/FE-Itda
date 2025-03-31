import Category from "@/components/Category";
import WebNovelGroup from "@/components/WebNovelGroup";
import clsx from "clsx";
import { useState } from "react";

const MainPage = () => {
  return (
    <>
      {/* 카테고리 */}
      <Category />

      {/* 작품들 */}
      <WebNovelGroup />
    </>
  );
};

export default MainPage;
