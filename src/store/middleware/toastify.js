const toastify = (store) => (next) => (action) => {
  if (action.type === "error") {
    console.log("An error has occurred: ", action.payload.message);
  } else next(action);
};

export default toastify;
