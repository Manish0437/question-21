// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${number.toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="coverage-cont">
      <h1 className="graph-titles">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={last7DaysVaccination}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccination_date"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose_1" name="Dose 1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose_2" name="Dose 2" fill="#f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
