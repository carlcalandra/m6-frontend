import { nanoid } from "nanoid";
const createToast = (error) => ({
    id:nanoid(),
    color:"danger",
    title:error.message,
    content:error.response.data.message
  })

export default createToast;