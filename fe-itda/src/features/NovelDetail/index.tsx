import { NovelDetailStyled } from "./styled";
import NovelInfo from "../NovelInfo";

const NovelDetail = ({ data }: { data?: number }) => {
  return (
    <NovelDetailStyled>
      <NovelInfo data={data} />
    </NovelDetailStyled>
  );
};

export default NovelDetail;
