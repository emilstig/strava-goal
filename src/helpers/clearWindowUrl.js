const clearWindowUrl = () => {
  history.pushState(
    "",
    document.title,
    "/"
    // + window.location.search // Keep search params
  );
};

export default clearWindowUrl;
