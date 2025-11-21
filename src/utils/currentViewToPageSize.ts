const mapCurrentViewToPageSize = (view: string): number => {
  switch (view) {
    case 'WEB':
      return 15;
    case 'TABLET':
      return 10;
    case 'MOBILE':
      return 5;
    default:
      return 15;
  }
};

export default mapCurrentViewToPageSize;
