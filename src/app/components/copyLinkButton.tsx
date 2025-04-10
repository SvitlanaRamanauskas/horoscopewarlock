'use client';

export const CopyLinkButton = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <button onClick={handleCopy}>
      Скопіювати посилання
    </button>
  );
};
