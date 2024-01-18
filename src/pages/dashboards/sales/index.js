// import mysql from "mysql2";


// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'xgen',
//   database: 'dialtas',
// });

// // Example: Insert a new user
// const newLeads = {
//     organization_name: 'XGen',
//     opurtunity: 'Sales Lead',
//     email: 'xgen@xgen.com',
//     phone: '123-456-7890',
//     revenue: '4000',
//     periority: 'High'
// };



// // Example: Retrieve all users
// connection.query('SELECT * FROM leads', (err, results) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log(results);
//     }
// });

// Close the connection pool after operations



import { useState } from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Icon from 'src/@core/components/icon'

import { fontSize, padding } from '@mui/system'
import Image from 'next/image'

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
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(
    Object.keys(initialData).map(column => ({
      id: column,
      rows: initialData[column]
    }))
  )

  const [value, setValue] = useState('1')
  const [isAddLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    organization: '',
    opportunity: '',
    email: '',
    phone: '',
    expectedRevenue: '',
    priority: '',
  });

  const handleAddLead = () => {
    // Step 3: Update state with the new lead data
    const newLead = {
      id: String(Date.now()), // Generate a unique ID
      name: newLeadData.organization,
      lead: newLeadData.opportunity,
      phone: newLeadData.phone,
      address: 'Address Placeholder', // You may adjust this based on your needs
    };

    // Update state
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      const newColumnIndex = updatedColumns.findIndex((column) => column.id === 'New');
      updatedColumns[newColumnIndex].rows.push(newLead);
      return updatedColumns;
    });

    // Close the modal
    setAddLeadModalOpen(false);
  };

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
      <Image src={'/images/logos/sales-pipeline.png'} width={350} height={60} alt='sales pipeline' />
      <Box sx={{ marginTop: 10, marginBottom: 10 }}>
        <Button
          variant='contained'
          onClick={() => setAddLeadModalOpen(true)}
        >
          Add New
        </Button>
        <Modal open={isAddLeadModalOpen} onClose={() => setAddLeadModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography variant="h5" mb={2}>
            Add New Lead
          </Typography>
          <TextField
            label="Organization Name"
            fullWidth
            margin="normal"
            onChange={(e) => setNewLeadData({ ...newLeadData, organization: e.target.value })}
          />
          <TextField
            label="Opportunity Name"
            fullWidth
            margin="normal"
            onChange={(e) => setNewLeadData({ ...newLeadData, opportunity: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
          />
          <TextField
            label="Expected Revenue"
            fullWidth
            margin="normal"
            onChange={(e) => setNewLeadData({ ...newLeadData, expectedRevenue: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={newLeadData.priority}
              onChange={(e) => setNewLeadData({ ...newLeadData, priority: e.target.value })}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="veryHigh">Very High</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleAddLead}>
            Add Lead
          </Button>
        </Box>
      </Modal>
      </Box>

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
                <h2 style={{ backgroundColor: 'white' }}>
                  <Icon icon='ion:reorder-two-outline' />
                  {column.id}

                  {/* <Icon icon='basil:add-outline' /> */}
                </h2>
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
