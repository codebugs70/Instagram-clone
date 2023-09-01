import { formatDistanceToNow } from "date-fns";

export const formatDateTime = (data) => {
  if (!data) return;
  const createdAtDate = data.toDate();
  const date = formatDistanceToNow(createdAtDate, {
    addSuffix: true,
  });

  return date;
};
