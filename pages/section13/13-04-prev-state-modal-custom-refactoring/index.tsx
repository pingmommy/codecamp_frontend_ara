import { Modal } from "antd";
import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import type { Address } from "react-daum-postcode";
export default function ModalAlertPage(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const onToggleModal = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleComplete = (data: Address): void => {
    console.log(data);
    onToggleModal();
  };
  return (
    <>
      <button onClick={onToggleModal}>모달창열기</button>
      {/* 모달종료방식 -1. 모달 숨기는 방법(이력서 긴 내용 작성 등에 유용) 새 모달창이 뜨지 않는다 */}
      {/* <Modal open={isOpen} onOk={handleOK} onCancel={handleCancel}>
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal> */}
      {/* 모달종료방식 -1. 모달 삭제하는 방법 (신용카드 비밀번호등 ) */}
      {isOpen && (
        <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
}
