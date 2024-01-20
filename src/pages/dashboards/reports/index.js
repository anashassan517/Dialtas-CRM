import { Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Icon from 'src/@core/components/icon'

import ReportList from 'src/pages/dashboards/reports/List/index'
import ReportCalendar from './Calender'
import Insight from './Insights'

import Card from '@mui/material/Card'

import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Bar } from 'react-chartjs-2'

// import CardContent from '@mui/material'

// ** Actions

const ReportsDashboard = () => {
  const [value, setValue] = useState('1')

  // ** Props
  const yellow = 'yellow',
    labelColor = 'black',
    borderColor = 'black'

  // ** States
  //   const [endDate, setEndDate] = useState(null)
  //   const [startDate, setStartDate] = useState(null)

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
        max: 400,
        grid: {
          color: borderColor
        },
        ticks: {
          stepSize: 100,
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
      '7/12',
      '8/12',
      '9/12',
      '10/12',
      '11/12',
      '12/12',
      '13/12',
      '14/12',
      '15/12',
      '16/12',
      '17/12',
      '18/12',
      '19/12'
    ],
    datasets: [
      {
        maxBarThickness: 15,
        backgroundColor: yellow,
        borderColor: 'transparent',
        borderRadius: { topRight: 15, topLeft: 15 },
        data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190]
      }
    ]
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box>
      <Image src={'/images/logos/report-logo.png'} width={350} height={60} alt='sales report' />
      <Box>
        <Button sx={{ marginTop: 10, marginBottom: 10 }} variant='contained'>
          Add New
        </Button>
        <TabContext value={value}>
          <TabList scrollButtons variant='scrollable' onChange={handleChange} aria-label='forced scroll tabs example'>
            <Tab value='1' label='Overview' icon={<Icon icon='bi:speedometer2' />} />
            <Tab value='2' label='List View' icon={<Icon icon='icons8:todo-list' />} />
            <Tab value='3' label='Calender View' icon={<Icon icon='uit:calender' />} />
            <Tab value='4' label='Insights' icon={<Icon icon='system-uicons:graph-bar' />} />
          </TabList>
          <TabPanel value='1'>
            <Typography>
              Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer
              jelly cake caramels brownie gummies.
            </Typography>
          </TabPanel>
          <TabPanel value='2'>
            <ReportList />
          </TabPanel>
          <TabPanel value='3'>
            <ReportCalendar />
          </TabPanel>

          <TabPanel value='4'>
            <Insight />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  )
}

export default ReportsDashboard
