import CashCharge from "@/features/CashCharge";
import { Modal } from "antd";

interface PopcornProps {
  modalOpen: boolean;
  setModalOpen: any;
}

{
  /* 결제할 팝콘 모달창 */
}
const PopcornModal = ({ modalOpen, setModalOpen }: PopcornProps) => {
  return (
    <Modal
      title="팝콘 패키지"
      centered
      open={modalOpen}
      footer={null}
      onCancel={() => setModalOpen(false)}
    >
      <CashCharge />
    </Modal>
  );
};

export default PopcornModal;
