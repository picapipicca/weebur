type SkeletonProps = {
  variant: "list" | "grid";
};

const SkeletonCard = ({ variant }: SkeletonProps) => {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm animate-pulse ${
        variant === "list" ? "flex md:flex-row gap-4" : "flex flex-col"
      }`}
    >
      <div
        className={`bg-gray-200 ${
          variant === "list" ? "w-1/3 h-32" : "w-full h-40"
        } rounded-md`}
      />
      <div className="flex flex-col flex-1 gap-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-100 rounded w-5/6" />
        <div className="h-8 bg-gray-100 rounded w-1/2 mt-auto" />
      </div>
    </div>
  );
};
export default SkeletonCard;
