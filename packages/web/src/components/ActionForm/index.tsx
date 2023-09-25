import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as URLS from 'config/urls';
import { useNavigate, useParams } from 'react-router-dom';

function ActionForm() {
  const {appKey} = useParams(); 
  const navigate = useNavigate();
  const [actions, setActions] = useState(
    {
      name: '',
      Key: '',
      Description: '',
    },
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setActions((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    const formattedActionData = {
      name: actions.name,
      key: actions.Key,
      description: actions.Description,
    };
    
    navigate(URLS.INPUTACTION_PAGE, { 
      state:  formattedActionData  });
  };

  const paperStyle = {
    width: '500px',
    padding: '20px',
  };

  return (
    <Paper sx={paperStyle}>
      <Typography variant="h6" sx={{ mb: 2 }}>Actions</Typography>
      <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={"name"}>Name:</label>
              <TextField
                name={"name"}
                fullWidth
                required
                value={actions.name}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={"Key"}>Key:</label>
              <TextField
                name={"Key"}
                fullWidth
                required
                value={actions.Key}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={"Description"}>Description:</label>
              <TextField
                name={"Description"}
                fullWidth
                required
                value={actions.Description}
                onChange={handleInputChange}
                margin="dense"
                size="small"
              />
            </div>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Continue
        </Button>
      </form>
    </Paper>
  );
}

export default ActionForm;
