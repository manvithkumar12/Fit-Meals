import Skeleton from "@mui/material/Skeleton";

export const Field = ({ loading, children }: any) =>
  loading ? (
    <Skeleton
      variant="rectangular"
      width={100}
      height={36}
      className="ml-auto mr-5 rounded-md"
    />
  ) : (
    children
  );
