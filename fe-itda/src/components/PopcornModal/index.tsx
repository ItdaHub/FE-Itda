import CashCharge from "@/features/CashCharge";
import { Modal } from "antd";

interface PopcornProps {
  novelId?: number;
  chapterId?: number;
  type?: string;
  modalOpen: boolean;
  setModalOpen: any;
}

{
  /* 결제할 팝콘 모달창 */
}
const PopcornModal = ({
  novelId,
  chapterId,
  type,
  modalOpen,
  setModalOpen,
}: PopcornProps) => {
  return (
    <Modal
      title="팝콘 패키지"
      centered
      open={modalOpen}
      footer={null}
      onCancel={() => setModalOpen(null)}
    >
      <CashCharge novelId={novelId} chapterId={chapterId} type={type} />
    </Modal>
  );
};

export default PopcornModal;
