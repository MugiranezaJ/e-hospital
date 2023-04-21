const CustomTextInput = ({ label, ...props }) => {
  // const [field, meta] = useField(props);
  // const errorClassName = meta.touched && meta.error ? "border-red-500" : "";
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
        //   {...field}
        {...props}
      />
      {/* {meta.touched && meta.error ? (
          <div className="text-red-500 text-sm mt-1">{meta.error}</div>
        ) : null} */}
    </div>
  );
};

export default CustomTextInput