const Title = ({ title, className }) => {
  return (
    <h3 className={`font-semibold dark:text-white ${className}`}>{title}</h3>
  );
};
export default Title;
