import { CloudinaryOptions } from './types';

export function getWidgetCallback(
  setFileImage: any,
  fileImage: any,
  error: any,
  result: any
) {
  if (!error && result && result.event === 'success') {
    if (!fileImage) {
      setFileImage([{ ...result.info }]);
    } else {
      setFileImage([...fileImage, { ...result.info }]);
    }
  }
  if (error) {
    console.error(error.message);
  }
}
export function getWidget(
  setFileImage: any,
  fileImage: object,
  cloudinaryOptions: CloudinaryOptions
) {
  if (typeof window.cloudinary === 'undefined') return null;
  let options = cloudinaryOptions;
  let widget = window.cloudinary.createUploadWidget(
    options,
    (error: any, result: any) =>
      getWidgetCallback(setFileImage, fileImage, error, result)
  );
  return widget;
}
export function showWidget(widget: any) {
  if (typeof window.cloudinary === 'undefined') return null;
  widget.open();
}
