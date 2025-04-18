import CashCharge from "@/features/CashCharge";
import { Modal } from "antd";

interface PopcornProps {
  modalOpen: boolean;
  setModalOpen: any;
}

const PopcornModal = ({ modalOpen, setModalOpen }: PopcornProps) => {
  return (
    <>
      {/* 결제할 팝콘 모달창 */}
      <Modal
        title="팝콘 패키지"
        centered
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <CashCharge />
      </Modal>
    </>
  );
};

export default PopcornModal;
