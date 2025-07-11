export const getErrorMessage = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    return error.message || "Unknown error occurred";
  };
  