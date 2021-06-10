const logger = (param) => (store) => (next) => (action) => {
  console.log("dispatch", action);
  next(action);
};

export default logger;
