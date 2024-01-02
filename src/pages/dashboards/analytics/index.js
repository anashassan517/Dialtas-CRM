// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import AnalyticsProject from 'src/views/dashboards/analytics/AnalyticsProject'
import AnalyticsOrderVisits from 'src/views/dashboards/analytics/AnalyticsOrderVisits'
import AnalyticsTotalEarning from 'src/views/dashboards/analytics/AnalyticsTotalEarning'
import AnalyticsSourceVisits from 'src/views/dashboards/analytics/AnalyticsSourceVisits'
import AnalyticsEarningReports from 'src/views/dashboards/analytics/AnalyticsEarningReports'
import AnalyticsSupportTracker from 'src/views/dashboards/analytics/AnalyticsSupportTracker'
import AnalyticsSalesByCountries from 'src/views/dashboards/analytics/AnalyticsSalesByCountries'
import AnalyticsMonthlyCampaignState from 'src/views/dashboards/analytics/AnalyticsMonthlyCampaignState'
import AnalyticsWebsiteAnalyticsSlider from 'src/views/dashboards/analytics/AnalyticsWebsiteAnalyticsSlider'

// ** Custom Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsWithAreaChart from 'src/@core/components/card-statistics/card-stats-with-area-chart'

const AnalyticsDashboard = () => {
  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={6}>
            <AnalyticsWebsiteAnalyticsSlider />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <AnalyticsOrderVisits />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <CardStatsWithAreaChart
              stats='97.5k'
              chartColor='success'
              avatarColor='success'
              title='Revenue Generated'
              avatarIcon='tabler:credit-card'
              chartSeries={[{ data: [6, 35, 25, 61, 32, 84, 70] }]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <AnalyticsEarningReports />
          </Grid>
          <Grid item xs={12} md={6}>
            <AnalyticsSupportTracker />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsSalesByCountries />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsTotalEarning />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsMonthlyCampaignState />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsSourceVisits />
          </Grid>
          <Grid item xs={12} lg={8}>
            <AnalyticsProject />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard

//ch
// import { useState } from 'react'

// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   Button,
//   Typography
// } from '@mui/material'

// // ** MUI Imports
// import Tab from '@mui/material/Tab'
// import TabList from '@mui/lab/TabList'
// import TabPanel from '@mui/lab/TabPanel'
// import TabContext from '@mui/lab/TabContext'
// import Icon from 'src/@core/components/icon'
// import { padding } from '@mui/system'

// const initialData = {
//   New: [
//     { id: '1', name: 'Provider Name', lead: 'Lead Name ', phone: '+167-985-2264', address: '21604 ELMHEART DRIVE' },
//     { id: '2', name: 'Provider Name', lead: 'Lead Name ', phone: '+167-985-2264', address: '21604 ELMHEART DRIVE' },
//     { id: '3', name: 'Provider Name', lead: 'Lead Name ', phone: '+167-985-2264', address: '21604 ELMHEART DRIVE' },
//     { id: '4', name: 'Provider Name', lead: 'Lead Name ', phone: '+167-985-2264', address: '21604 ELMHEART DRIVE' }

//     // Add more rows as needed
//   ],
//   'Non-Sales Call': [
//     {
//       id: '5',
//       name: 'Provider Name',
//       lead: 'Lead Name',
//       phone: '+167-985-2264',
//       address: '21604 ELMHEART DRIVE'
//     },
//     { id: '6', name: 'Provider Name', lead: 'Lead Name ', phone: '+167-985-2264', address: '21604 ELMHEART DRIVE' }

//     // Add more rows as needed
//   ],
//   'Sales Not Converted': [
//     {
//       id: '7',
//       name: 'Provider Name',
//       lead: 'Lead Name',
//       phone: '+167-985-2264',
//       address: '21604 ELMHEART DRIVE'
//     },
//     {
//       id: '8',
//       name: 'Provider Name',
//       lead: 'Lead Name',
//       phone: '+167-985-2264',
//       address: '21604 ELMHEART DRIVE'
//     },
//     {
//       id: '9',
//       name: 'Provider Name',
//       lead: 'Lead Name',
//       phone: '+167-985-2264',
//       address: '21604 ELMHEART DRIVE'
//     }

//     // Add more rows as needed
//   ]
// }

// const AnalyticsDashboard = () => {
//   const [data, setData] = useState(initialData)

//   const [columns, setColumns] = useState(
//     Object.keys(initialData).map(column => ({
//       id: column,
//       rows: initialData[column]
//     }))
//   )

//   const [value, setValue] = useState('1')

//   const handleChange = (event, newValue) => {
//     setValue(newValue)
//   }

//   const onDragEnd = result => {
//     if (!result.destination) return

//     const sourceColumnId = result.source.droppableId
//     const destColumnId = result.destination.droppableId

//     const sourceColumnIndex = columns.findIndex(column => column.id === sourceColumnId)
//     const destColumnIndex = columns.findIndex(column => column.id === destColumnId)

//     const updatedColumns = [...columns]
//     const [movedItem] = updatedColumns[sourceColumnIndex].rows.splice(result.source.index, 1)

//     // Check if source column is empty, set to an empty array if needed
//     updatedColumns[sourceColumnIndex].rows = updatedColumns[sourceColumnIndex].rows || []

//     updatedColumns[destColumnIndex].rows.splice(result.destination.index, 0, movedItem)

//     setColumns(updatedColumns)

//     // Update data if needed
//     const updatedData = {
//       ...data,
//       [sourceColumnId]: updatedColumns[sourceColumnIndex].rows,
//       [destColumnId]: updatedColumns[destColumnIndex].rows
//     }

//     setData(updatedData)
//   }

//   return (
//     <Box>
//       <Button variant='contained'>Add New</Button>

//       <DragDropContext onDragEnd={onDragEnd}>
//         <Box>
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-around',
//               marginTop: '20px',
//               color: '#1467B0'
//             }}
//           >
//             {columns.map((column, columnIndex) => (
//               <div key={columnIndex}>
//                 <h2 style={{ backgroundColor: 'white' }}>{column.id}</h2>
//                 <Droppable droppableId={column.id} type='column'>
//                   {(provided, snapshot) => (
//                     <TableContainer component={Paper} {...provided.droppableProps} ref={provided.innerRef}>
//                       <Table>
//                         <TableBody>
//                           {column.rows.map((item, index) => (
//                             <Draggable key={item.id} draggableId={item.id} index={index}>
//                               {provided => (
//                                 <TableRow
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                 >
//                                   <TableCell component={Paper} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
//                                     {/* Side indicator */}
//                                     <Box
//                                       sx={{
//                                         backgroundColor:
//                                           column.id === 'New'
//                                             ? '#1467B0'
//                                             : column.id === 'Non-Sales Call'
//                                             ? '#FB233B'
//                                             : '#7523FB',
//                                         width: 10,
//                                         height: '100%',

//                                         mr: 50
//                                       }}

//                                       // /
//                                     >
//                                       <div style={{ paddingLeft: 15, width: '200px' }}>
//                                         {/* Name in blue bold */}
//                                         <Typography variant='h6' fontWeight='bold' color='#1467B0'>
//                                           {item.name}
//                                         </Typography>
//                                         {/* Lead name in bold black */}
//                                         <Typography variant='body1' fontWeight='bold'>
//                                           {item.lead}
//                                         </Typography>{' '}
//                                         <Typography variant='subtitle2'>{item.phone}</Typography>{' '}
//                                         <Typography variant='subtitle2'>{item.address}</Typography>
//                                       </div>
//                                     </Box>
//                                   </TableCell>
//                                 </TableRow>
//                               )}
//                             </Draggable>
//                           ))}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                   )}
//                 </Droppable>
//               </div>
//             ))}
//           </div>
//         </Box>
//       </DragDropContext>
//     </Box>
//   )
// }

// export default AnalyticsDashboard
