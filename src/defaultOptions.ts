import { Options } from './types/propTypes';

const options: Options = {
  cloudinary: {
    cloudName: 'tincre',
    uploadPreset: 'iwngwfob',
    folder: 'promo-button-submissions',
    multiple: false,
  },
  howItWorksContent: {
    steps: [
      {
        title: `Your ads are optimizing. Check your email for the invoice link.`,
        subtitle: `Once paid, your campaign will be serving ads.`,
      },
      {
        title: 'Monitor your ads right from your inbox. ',
        subtitle: `We'll send you daily reports with just what's important.`,
      },
      {
        title: `Save time and focus on what matters: you! `,
        subtitle: `You're now rocking with your ad campaign.`,
      },
    ],
    submittedTitle: 'Success!',
    submittedSubtitle: 'Check your email for a link to fund your campaign.',
    title: 'Start a campaign',
    subtitle: 'We just need a few things to run your ads.',
    footerCloseMessage:
      'Click the X above or anywhere outside of this dialogue to close.',
  },
};

export default options;
