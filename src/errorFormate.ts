export const formatErrorResponse = (error: any) => {
  return {
    message: error?.message || 'Something went wrong',
    success: false,
    error: error,
  };
};
