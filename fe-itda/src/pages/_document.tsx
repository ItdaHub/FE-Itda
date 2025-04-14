import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";
// 화살표 함수로 작성된 MyDocument
const MyDocument = ({ styles }: any) => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {styles} {/* 스타일을 추가합니다 */}
      </body>
    </Html>
  );
};
// getInitialProps를 통해 서버사이드에서 스타일을 처리
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;
  try {
    // 페이지 렌더링 중에 styled-components 스타일을 수집합니다.
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });
    // 기본 Document의 초기 props를 가져옵니다.
    const initialProps = await Document.getInitialProps(ctx); // 여전히 Next.js에서 제공하는 방식
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()} {/* styled-components 스타일 추가 */}
        </>
      ),
    };
  } finally {
    sheet.seal(); // styled-components의 sheet를 봉인합니다.
  }
};
export default MyDocument;
