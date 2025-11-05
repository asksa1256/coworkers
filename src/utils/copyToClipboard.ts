export const copyToClipboard = async (text: string) => {
  if (navigator.clipboard) {
    // navigator.clipboard 지원O
    await navigator.clipboard.writeText(text);
  } else {
    // navigator.clipboard 지원X - fallback용
    // ex) iphone safari, IE ...
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    textArea.style.zIndex = '-9999';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const result = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (!result) throw new Error('execCommand 복사 실패');
  }
};
