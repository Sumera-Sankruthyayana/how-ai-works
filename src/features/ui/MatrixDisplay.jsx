export default function MatrixDisplay({ data, size, title }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
          No matrix data available
        </p>
      </div>
    );
  }

  const [rows, cols] = size;

  // Assign color classes based on column index
  const getColorClass = (colIndex) => {
    switch (colIndex) {
      case 0:
        return "text-red-500"; // x
      case 1:
        return "text-green-500"; // y
      case 2:
        return "text-blue-500"; // z
      default:
        return "text-gray-800"; // fallback
    }
  };

  return (
    <div className="p-0.5">
      <p className="text-1xl font-medium text-center text-gray-900 dark:text-white">
        {title}
      </p>
      <table className="border-collapse border dark:border-gray-300 border-gray-700">
        <tbody>
          {Array.isArray(data[0]) ? (
            // Handle 2D array case
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border border-gray-300 px-3 py-1 text-right ${getColorClass(
                      colIndex
                    )}`}
                  >
                    {value.toFixed(3)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            // Handle 1D array case
            <tr>
              {data.map((value, colIndex) => (
                <td
                  key={colIndex}
                  className={`border border-gray-300 px-3 py-1 text-right ${getColorClass(
                    colIndex
                  )}`}
                >
                  {value.toFixed(3)}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
