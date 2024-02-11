export const setnotification = (notification) => {
  return { type: "setNotification", data: { notification: notification } };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "setNotification": {
      return action.data.notification;
    }
    default:
      return state;
  }
};
export default notificationReducer;
