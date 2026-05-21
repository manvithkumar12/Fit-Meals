import { toast } from "react-toastify";

export const deleteFromAws = async (fileUrl: string) => {
  try {
    const res = await fetch("/api/delete-file", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        fileUrl,
      }),
    });

    if (!res.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
