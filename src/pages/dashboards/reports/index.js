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

// import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** FullCalendar & App Components Imports
import Calendar from 'src/views/apps/calendar/Calendar'
import SidebarLeft from 'src/views/apps/calendar/SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'

// ** Actions
import {
  addEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  handleSelectEvent,
  handleAllCalendars,
  handleCalendarsUpdate
} from 'src/store/apps/calendar'
import { position } from 'stylis'

// ** CalendarColors
const calendarsColor = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
}

const ReportsDashboard = () => {
  const [calendarApi, setCalendarApi] = useState(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)

  // ** Hooks
  const { settings } = useSettings()
  const dispatch = useDispatch()
  const store = useSelector(state => state.calendar)

  // ** Vars
  const leftSidebarWidth = 300
  const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))
  useEffect(() => {
    dispatch(fetchEvents(store.selectedCalendars))
  }, [dispatch, store.selectedCalendars])
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  const [value, setValue] = useState('1')

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
            <Typography>
              Chocolate bar carrot cake candy canes sesame snaps. Cupcake pie gummi bears jujubes candy canes. Chupa
              chups sesame snaps halvah.
            </Typography>
          </TabPanel>
          <TabPanel value='3'>
            <Typography>
              Danish tiramisu jujubes cupcake chocolate bar cake cheesecake chupa chups. Macaroon ice cream tootsie roll
              carrot cake gummi bears.
            </Typography>
          </TabPanel>
          
          <TabPanel value='4'>
            {/* <Typography>
              Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer
              jelly cake caramels brownie gummies.
            </Typography> */}
          </TabPanel>
          <TabPanel value='5'>
            <Typography>
              Chocolate bar carrot cake candy canes sesame snaps. Cupcake pie gummi bears jujubes candy canes. Chupa
              chups sesame snaps halvah.
            </Typography>
          </TabPanel>
        </TabContext>
      </Box>

      <Box>
        <CalendarWrapper
          className='app-calendar'
          sx={{
            boxShadow: skin === 'bordered' ? 0 : 6,
            ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
          }}
        >
          <Box
            sx={{
              p: 6,
              pb: 0,
              flexGrow: 1,
              borderRadius: 1,
              boxShadow: 'none',
              backgroundColor: 'background.paper',
              ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
            }}
          >
            <Calendar
              store={store}
              dispatch={dispatch}
              direction={direction}
              updateEvent={updateEvent}
              calendarApi={calendarApi}
              calendarsColor={calendarsColor}
              setCalendarApi={setCalendarApi}
              handleSelectEvent={handleSelectEvent}
              handleLeftSidebarToggle={handleLeftSidebarToggle}
              handleAddEventSidebarToggle={handleAddEventSidebarToggle}
            />
          </Box>
          <SidebarLeft
            store={store}
            mdAbove={mdAbove}
            dispatch={dispatch}
            calendarApi={calendarApi}
            calendarsColor={calendarsColor}
            leftSidebarOpen={leftSidebarOpen}
            leftSidebarWidth={leftSidebarWidth}
            handleSelectEvent={handleSelectEvent}
            handleAllCalendars={handleAllCalendars}
            handleCalendarsUpdate={handleCalendarsUpdate}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          />
          <AddEventSidebar
            store={store}
            dispatch={dispatch}
            addEvent={addEvent}
            updateEvent={updateEvent}
            deleteEvent={deleteEvent}
            calendarApi={calendarApi}
            drawerWidth={addEventSidebarWidth}
            handleSelectEvent={handleSelectEvent}
            addEventSidebarOpen={addEventSidebarOpen}
            handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          />
        </CalendarWrapper>
      </Box>
    </Box>
  )
}

export default ReportsDashboard
