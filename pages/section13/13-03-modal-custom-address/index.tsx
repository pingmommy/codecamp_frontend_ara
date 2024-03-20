import { Modal } from "antd";
import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import type { Address } from "react-daum-postcode";
export default function ModalAlertPage(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const showModal = (): void => {
    setIsOpen(true);
  };
  const handleOK = (): void => {
    setIsOpen(false);
  };
  const handleCancel = (): void => {
    setIsOpen(false);
  };

  const handleComplete = (data: Address): void => {
    console.log(data);
    setIsOpen(false);
  };
  return (
    <>
      <button onClick={showModal}>모달창열기</button>
      {/* 모달종료방식 -1. 모달 숨기는 방법(이력서 긴 내용 작성 등에 유용) 새 모달창이 뜨지 않는다 */}
      {/* <Modal open={isOpen} onOk={handleOK} onCancel={handleCancel}>
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal> */}
      {/* 모달종료방식 -1. 모달 삭제하는 방법 (신용카드 비밀번호등 ) */}
      {isOpen && (
        <Modal open={true} onOk={handleOK} onCancel={handleCancel}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
}
