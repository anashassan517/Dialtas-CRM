import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
  Alert,
} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableRow, Card, Paper } from '@mui/material';
import Image from 'next/image';
import Divider from '@mui/material';
import Icon from 'src/@core/components/icon'

const SalesDashboard = () => {
  const [data, setData] = useState({
    New: [],
    'Non-Sales Call': [],
    'Sales Not Converted': [],
  });

  const [columns, setColumns] = useState([
    { id: 'New', title: 'New' },
    { id: 'Non-Sales Call', title: 'Non-Sales Call' },
    { id: 'Sales Not Converted', title: 'Sales Not Converted' },
  ]);

  const [value, setValue] = useState('1');
  const [isAddLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    organization: '',
    opportunity: '',
    email: '',
    phone: '',
    expectedRevenue: '',
    priority: '',
  });

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/get-leads');
      const leadsData = await response.json();
      setData({
        New: leadsData.filter((lead) => lead.leadType === 'New'),
        'Non-Sales Call': leadsData.filter((lead) => lead.leadType === 'Non-Sales Call'),
        'Sales Not Converted': leadsData.filter((lead) => lead.leadType === 'Sales Not Converted'),
      });
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const insertLeads = async () => {
    try {
      const response = await fetch('/api/add-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLeadData),
      });

      if (response.ok) {
        <Alert severity='success'>This is an success alert — check it out!</Alert>
        console.log('Lead added successfully!');
        setAddLeadModalOpen(false);
        fetchLeads(); // Refresh leads after adding a new one
      } else {
        console.error('Error adding lead:', await response.json());
      }
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceColumnId = result.source.droppableId;
    const destColumnId = result.destination.droppableId;

    if (sourceColumnId === destColumnId) return;

    const movedItem = data[sourceColumnId][result.source.index];

    // Update data if needed
    const updatedData = { ...data };
    updatedData[sourceColumnId] = data[sourceColumnId].filter((item, index) => index !== result.source.index);
    updatedData[destColumnId] = [...data[destColumnId], movedItem];

    setData(updatedData);

    // Update lead type in the database
    const movedLeadId = movedItem.id;
    const newLeadType = destColumnId;

    try {
      const response = await fetch('/api/update-lead-type', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadId: movedLeadId,
          newLeadType,
        }),
      });

      if (!response.ok) {
        console.error('Error updating lead type:', await response.json());
      }
    } catch (error) {
      console.error('Error updating lead type:', error);
    }
  };

  return (
    <Box>
      <Image src={'/images/logos/sales-pipeline.png'} width={350} height={60} alt='sales pipeline' />
      <Box sx={{ marginTop: 10, marginBottom: 10 }}>
        <Button variant='contained' onClick={() => setAddLeadModalOpen(true)}>
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
                <MenuItem value="very_high">Very High</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={insertLeads}>
              Add Lead
            </Button>
          </Box>
        </Modal>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box >
          <div
            style={{
              display: 'flex',
              marginTop: '20px',
              color: '#1467B0',
            }}
          >
            {columns.map((column) => (
              <Box component={Card} sx={{ mr: 10 }}>
                <div>
                  {/* <Divider component="ul" light /> */}
                  <Icon icon='akar-icons:two-line-horizontal' />
                  <Icon icon='icon-park-outline:add' />
                </div>
                {/* <Divider component="ul" light /> */}
                <div key={column.id}>
                  <h2 style={{ backgroundColor: 'white', color: '#1467B0', fontSize: 18 }}>
                    {column.title}
                  </h2>
                  <Droppable droppableId={column.id} type='column'>
                    {(provided) => (
                      <TableContainer component={Card} {...provided.droppableProps} ref={provided.innerRef}>
                        <Table>
                          <TableBody>
                            {data[column.id].map((item, index) => (
                              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                {(provided) => (
                                  <TableRow
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <TableCell component={Card} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                                      <Box
                                        sx={{
                                          backgroundColor:
                                            column.id === 'New'
                                              ? '#1467B0'
                                              : column.id === 'Non-Sales Call'
                                                ? '#FB233B'
                                                : '#7523FB',
                                          width: 7,
                                          height: '100%',
                                          mr: 50,
                                        }}
                                      >
                                        <div style={{ paddingLeft: 15, width: '200px' }}>
                                          <Typography variant="h6" fontWeight="bold" color="#1467B0">
                                            {item.organization}
                                          </Typography>
                                          <Typography variant="body1" fontWeight="bold">
                                            {item.opportunity}
                                          </Typography>
                                          <Typography variant="subtitle2">{item.phone}</Typography>
                                          <Typography variant="subtitle2">{item.email}</Typography>

                                          <Typography variant="body1" fontWeight="bold">
                                            {item.priority}
                                          </Typography>
                                        </div>
                                      </Box>
                                    </TableCell>
                                  </TableRow>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  </Droppable>
                </div>
              </Box>
            ))}

          </div>
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default SalesDashboard;