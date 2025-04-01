import clsx from "clsx";
import { ReadBookStyled } from "./styled";
import HTMLFlipBook from "react-pageflip";

const ReadBook = () => {
  const pages = [
    <div key={1} className="page">
      📖 첫 번째 페이지
    </div>,
    <div key={2} className="page">
      📄 두 번째 페이지
    </div>,
    <div key={3} className="page">
      📚 세 번째 페이지
    </div>,
  ];

  // pages.length % 2 !== 0 ? (
  //   pages.push(<div key={pages.length + 1} className="page"></div>)
  // ) : (
  //   <></>
  // );

  return (
    <ReadBookStyled className={clsx("readbook-wrap")}>
      <HTMLFlipBook
        style={{}}
        height={500}
        width={510}
        className="my-book"
        size="fixed"
        startPage={0}
        minWidth={250}
        maxWidth={1202}
        minHeight={400}
        maxHeight={800}
        drawShadow={true}
        flippingTime={1200}
        usePortrait={false}
        startZIndex={0}
        autoSize={false}
        maxShadowOpacity={0.8}
        showCover={true}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={80}
        showPageCorners={true}
        disableFlipByClick={false}
      >
        {pages}
      </HTMLFlipBook>
    </ReadBookStyled>
  );
};

export default ReadBook;
