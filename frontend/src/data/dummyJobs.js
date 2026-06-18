export const initialJobs = [
  {
    id: "JOB001",
    fileName: "farmer_training.mp4",
    sourceLanguage: "Marathi",
    targetLanguage: "Hindi",
    status: "Completed",
    createdDate: "10 June 2026",
    outputs: ["text", "audio", "srt", "video"],
  },
  {
    id: "JOB002",
    fileName: "crop_advisory.wav",
    sourceLanguage: "Hindi",
    targetLanguage: "English",
    status: "Completed",
    createdDate: "11 June 2026",
    outputs: ["text", "audio"],
  },
  {
    id: "JOB003",
    fileName: "dairy_guide.pdf",
    sourceLanguage: "English",
    targetLanguage: "Marathi",
    status: "In Process",
    createdDate: "15 June 2026",
    outputs: ["text"],
  },
  {
    id: "JOB004",
    fileName: "irrigation_manual.docx",
    sourceLanguage: "English",
    targetLanguage: "Hindi",
    status: "Failed",
    createdDate: "16 June 2026",
    outputs: [],
  },
  {
    id: "JOB005",
    fileName: "livestock_health.mp3",
    sourceLanguage: "Marathi",
    targetLanguage: "English",
    status: "Completed",
    createdDate: "17 June 2026",
    outputs: ["text", "audio", "srt"],
  },
];

export const summary = {
  total: 25,
  inProcess: 3,
  completed: 20,
  failed: 2,
};

export const outputFileMeta = {
  text: { label: "Translated Transcript", ext: ".txt", size: "24 KB" },
  audio: { label: "Dubbed Audio", ext: ".wav", size: "12 MB" },
  srt: { label: "Subtitles", ext: ".srt", size: "45 KB" },
  video: { label: "Captioned Video", ext: ".mp4", size: "180 MB" },
};
