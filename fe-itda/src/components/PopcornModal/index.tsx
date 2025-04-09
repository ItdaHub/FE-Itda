import CashCharge from "@/features/CashCharge";
import { Modal } from "antd";

const PopcornModal = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: any;
}) => {
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
