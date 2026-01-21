export const copyToClipboard = (text: string) => {
  if (!navigator.clipboard?.writeText) {
    return Promise.reject(new Error('복사 할 수 없습니다.'));
  }

  return navigator.clipboard.writeText(text);
};
