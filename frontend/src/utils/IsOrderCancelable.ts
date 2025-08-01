const isOrderCancelable = (status: string, confirmedAt?: Date) => {
  if (status === "pending") return true;

  if (status === "confirmed" && confirmedAt) {
    const oneHourInMs = 1 * 60 * 60 * 1000;
    const timeSinceConfirmation = Date.now() - new Date(confirmedAt).getTime();
    return timeSinceConfirmation <= oneHourInMs;
  }

  return false;
};

export { isOrderCancelable };
