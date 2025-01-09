interface WeatherData {
  cityName: string;
  country: string;
  forecasts: Array<{
    date: string;
    highTemp: number;
    lowTemp: number;
    warnings: string[];
  }>;
}

interface WeatherDisplayProps {
  data: WeatherData;
}

export default function WeatherDisplay({ data }: WeatherDisplayProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        {data.cityName}, {data.country}
      </h2>
      <div className="space-y-6">
        {data.forecasts.map((forecast, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium mb-3">{forecast.date}</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600">High Temperature</p>
                <p className="text-2xl font-bold text-red-500">
                  {forecast.highTemp}°C
                </p>
              </div>
              <div>
                <p className="text-gray-600">Low Temperature</p>
                <p className="text-2xl font-bold text-blue-500">
                  {forecast.lowTemp}°C
                </p>
              </div>
            </div>
            {forecast.warnings.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Warnings:</h4>
                <ul className="space-y-2">
                  {forecast.warnings.map((warning, idx) => (
                    <li
                      key={idx}
                      className="bg-yellow-50 border-l-4 border-yellow-400 p-3"
                    >
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}