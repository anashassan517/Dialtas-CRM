// import { Typography } from '@mui/material'
// import { Box } from '@mui/system'
// import React from 'react'

// export const SalesDashboard = () => {
//   return (
//     <Box>
//       <Typography>Sales Dashboard</Typography>
//     </Box>
//   )
// }

// ** MUI Import

import { useState } from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography
} from '@mui/material'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Icon from 'src/@core/components/icon'
import { padding } from '@mui/system'

const initialData = {
  New: [
    { id: '1', name: 'Provider Name', lead: 'Lead Name ', phone: '+167-985-2264', address: '21604 ELMHEART DRIVE' },
    { id: '2', name: 'Provider Name', lead: 'Lead Name ', phone: '+167-985-2264', address: '21604 ELMHEART DRIVE' },
    { id: '3', name: 'Provider Name', lead: 'Lead Name ', phone: '+167-985-2264', address: '21604 ELMHEART DRIVE' },
    { id: '4', name: 'Provider Name', lead: 'Lead Name ', phone: '+167-985-2264', address: '21604 ELMHEART DRIVE' }

    // Add more rows as needed
  ],
  'Non-Sales Call': [
    {
      id: '5',
      name: 'Provider Name',
      lead: 'Lead Name',
      phone: '+167-985-2264',
      address: '21604 ELMHEART DRIVE'
    },
    { id: '6', name: 'Provider Name', lead: 'Lead Name ', phone: '+167-985-2264', address: '21604 ELMHEART DRIVE' }

    // Add more rows as needed
  ],
  'Sales Not Converted': [
    {
      id: '7',
      name: 'Provider Name',
      lead: 'Lead Name',
      phone: '+167-985-2264',
      address: '21604 ELMHEART DRIVE'
    },
    {
      id: '8',
      name: 'Provider Name',
      lead: 'Lead Name',
      phone: '+167-985-2264',
      address: '21604 ELMHEART DRIVE'
    },
    {
      id: '9',
      name: 'Provider Name',
      lead: 'Lead Name',
      phone: '+167-985-2264',
      address: '21604 ELMHEART DRIVE'
    }

    // Add more rows as needed
  ]
}

const SalesDashboard = () => {
  const [data, setData] = useState(initialData)

  const [columns, setColumns] = useState(
    Object.keys(initialData).map(column => ({
      id: column,
      rows: initialData[column]
    }))
  )

  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onDragEnd = result => {
    if (!result.destination) return

    const sourceColumnId = result.source.droppableId
    const destColumnId = result.destination.droppableId

    const sourceColumnIndex = columns.findIndex(column => column.id === sourceColumnId)
    const destColumnIndex = columns.findIndex(column => column.id === destColumnId)

    const updatedColumns = [...columns]
    const [movedItem] = updatedColumns[sourceColumnIndex].rows.splice(result.source.index, 1)

    // Check if source column is empty, set to an empty array if needed
    updatedColumns[sourceColumnIndex].rows = updatedColumns[sourceColumnIndex].rows || []

    updatedColumns[destColumnIndex].rows.splice(result.destination.index, 0, movedItem)

    setColumns(updatedColumns)

    // Update data if needed
    const updatedData = {
      ...data,
      [sourceColumnId]: updatedColumns[sourceColumnIndex].rows,
      [destColumnId]: updatedColumns[destColumnIndex].rows
    }

    setData(updatedData)
  }

  return (
    <Box>
      <Button variant='contained'>Add New</Button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '20px',
              color: '#1467B0'
            }}
          >
            {columns.map((column, columnIndex) => (
              <div key={columnIndex}>
                <h2 style={{ backgroundColor: 'white' }}>{column.id}</h2>
                <Droppable droppableId={column.id} type='column'>
                  {(provided, snapshot) => (
                    <TableContainer component={Paper} {...provided.droppableProps} ref={provided.innerRef}>
                      <Table>
                        <TableBody>
                          {column.rows.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {provided => (
                                <TableRow
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TableCell component={Paper} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                                    {/* Side indicator */}
                                    <Box
                                      sx={{
                                        backgroundColor:
                                          column.id === 'New'
                                            ? '#1467B0'
                                            : column.id === 'Non-Sales Call'
                                            ? '#FB233B'
                                            : '#7523FB',
                                        width: 10,
                                        height: '100%',

                                        mr: 50
                                      }}

                                      // /
                                    >
                                      <div style={{ paddingLeft: 15, width: '200px' }}>
                                        {/* Name in blue bold */}
                                        <Typography variant='h6' fontWeight='bold' color='#1467B0'>
                                          {item.name}
                                        </Typography>
                                        {/* Lead name in bold black */}
                                        <Typography variant='body1' fontWeight='bold'>
                                          {item.lead}
                                        </Typography>{' '}
                                        <Typography variant='subtitle2'>{item.phone}</Typography>{' '}
                                        <Typography variant='subtitle2'>{item.address}</Typography>
                                      </div>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              )}
                            </Draggable>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </Box>
      </DragDropContext>
    </Box>
  )
}

export default SalesDashboard
