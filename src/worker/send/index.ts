export const assign_id = (message_id: number, id: number) => {
  postMessage({
    type: "created",
    message_id: Date.now(),
    command: {
      id: id,
      message_id: message_id,
    },
  });
};