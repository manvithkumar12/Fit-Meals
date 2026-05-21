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
      toast.error("Failed to delete file");
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    toast.error("Delete failed");
    return false;
  }
};
