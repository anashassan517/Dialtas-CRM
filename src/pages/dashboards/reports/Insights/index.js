import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import format from 'date-fns/format'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ReportsInsight = props => {
  // ** Props
  const { yellow, labelColor, borderColor } = props


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          color: borderColor
        },
        ticks: { color: labelColor }
      },
      y: {
        min: 0,
        max: 10,
        grid: {
          color: borderColor
        },
        ticks: {
          stepSize: 1,
          color: labelColor
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }

  const data = {
    labels: [
      'New',
      'Qualified',
      'Proposition',
      'Won'
      // ,
      // '11/12',
      // '12/12',
      // '13/12',
      // '14/12',
      // '15/12',
      // '16/12',
      // '17/12',
      // '18/12',
      // '19/12'
    ],
    datasets: [
      {
        maxBarThickness: 700,
        backgroundColor: '#1467B0',
        borderColor: '#1467B0',
        borderRadius: { topRight: 15, topLeft: 15 },
        data: [5, 7, 9, 4, 1, 8, 5, 7, 7, 10, 3]
      }
    ]
  }
  return (
    <Card>
      <CardHeader
        title='Latest Statistics'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}

        // action={
        //   <DatePicker
        //     selectsRange
        //     id='chartjs-bar'
        //     endDate={endDate}
        //     selected={startDate}
        //     startDate={startDate}
        //     onChange={handleOnChange}
        //     placeholderText='Click to select a date'
        //     customInput={<CustomInput start={startDate} end={endDate} />}
        //   />
        // }
      />
      <CardContent>
        <Bar data={data} height={400} options={options} />
      </CardContent>
    </Card>
  )
}



export default ReportsInsight;