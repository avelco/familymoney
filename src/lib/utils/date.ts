export const epochToYMD = (epochSeconds: number) => {
	// Convert epoch seconds to a Date object.
	const date = new Date(epochSeconds * 1000);

	// Extract year, month, and day.
	const year = date.getFullYear();
	// Months are zero-based in JavaScript, so we add 1 and pad with zeros if needed.
	const month = String(date.getMonth() + 1).padStart(2, '0');
	// Get the day of the month and pad with zeros if needed.
	const day = String(date.getDate()).padStart(2, '0');

	// Construct the formatted date string.
	return `${year}-${month}-${day}`;
};
