const useFormattedDateTime = () => {
  const formatDate = (date: Date) => {
    if (date) {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    return;
  };
  const formatTime = (date: Date) => {
    if (date) {
      return date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }
    return;
  };

  return {
    formatDate,
    formatTime,
  };
};

export default useFormattedDateTime;
