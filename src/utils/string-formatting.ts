import { format, formatDistanceToNow } from "date-fns";

export const formatLongDate = (date: string | Date, relative: boolean = false) => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (relative) {
    return formatDistanceToNow(parsedDate, { addSuffix: true }); // e.g., "2 hours ago"
  }

  return format(parsedDate, "EEEE, MMMM do, yyyy 'at' h:mm a"); // e.g., "Monday, March 25, 2025 at 3:30 PM"
};