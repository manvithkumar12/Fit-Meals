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
    console.error(error);;
    return false;
  }
};

export const deleteMultipleFromAws = async (fileUrls: string[]) => {
  try {
    const res = await fetch("/api/delete-files", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        fileUrls,
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
