export interface DownloadItem {
  id: string; contentId: number; title: string; source: string; size_bytes: number;
  progress: number; status: "pending" | "downloading" | "completed" | "failed";
}

let downloads: DownloadItem[] = [];

export const queueDownload = (contentId: number, title: string, source: string, sizeBytes: number): DownloadItem => {
  const existing = downloads.find((d) => d.contentId === contentId);
  if (existing && existing.status === "completed") return existing;
  const item: DownloadItem = { id: `dl_${Date.now()}`, contentId, title, source, size_bytes: sizeBytes, progress: 0, status: "pending" };
  downloads.push(item);
  return item;
};

export const getDownloads = (): DownloadItem[] => downloads;
export const getOfflineContent = (): DownloadItem[] => downloads.filter((d) => d.status === "completed");
export const updateProgress = (contentId: number, progress: number): void => {
  const item = downloads.find((d) => d.contentId === contentId);
  if (item) { item.progress = Math.min(progress, 100); if (item.progress >= 100) item.status = "completed"; else if (item.progress > 0) item.status = "downloading"; }
};
export const removeDownload = (contentId: number): void => { downloads = downloads.filter((d) => d.contentId !== contentId); };
