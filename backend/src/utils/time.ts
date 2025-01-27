export const getCurrentTime = () => Math.floor(Date.now() / 1000);
export const addMinutes = (minutes: number) => getCurrentTime() + minutes * 60;
