// 상품사진이나 프로필사진을 업로드할 때 또 사용할 수 있으므로 commons에
// 컴포넌트형태로 만들었다바

export const checkValidationFile = (file?: File): boolean => {
  // 파일이 없다??
  if (typeof file === "undefined") {
    alert("파일없음");
    return false;
  }

  // 파일사이즈가 5mb가 크다??
  if (file.size > 5 * 1024 * 1024) {
    alert("파일용량 너무 큼!(제한:5MB)");
    return false;
  }

  // 파일의 타입이 포함하고 있니?
  if (!file.type.includes("jpeg") && !file.type.includes("png")) {
    alert("jpeg또는 png 타입만 가능함.");
    return false;
  }
  return true;
};
