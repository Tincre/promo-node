export interface CloudinaryOptions {
  cloudName: string;
  uploadPreset: string;
  folder: string;
  multiple: boolean;
}

export interface HowItWorksContent {
  steps: [
    { title: string; subtitle: string },
    { title: string; subtitle: string },
    { title: string; subtitle: string }
  ];
  title: string;
  subtitle: string;
  submittedSubtitle: string;
  submittedTitle: string;
  footerCloseMessage?: string;
}

export interface Options {
  cloudinary: CloudinaryOptions;
  howItWorksContent: HowItWorksContent;
}
