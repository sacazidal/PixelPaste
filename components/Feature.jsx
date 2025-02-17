const Feature = ({ className, title }) => {
  return (
    <div
      className={`text-[10px] rounded-xl bg-neutral-600 px-2 py-1 ${className}`}
    >
      {title}
    </div>
  );
};
export default Feature;
