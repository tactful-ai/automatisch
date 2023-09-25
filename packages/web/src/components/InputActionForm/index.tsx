import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import * as URLS from 'config/urls';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface State {
  actionFormData: {
    name: string;
    key: string;
    description: string;
  };
  inputActionData: {
    label: string;
    key: string;
    type: string;
    required: boolean;
    description: string;
    variables: boolean;
  }[];
}

function InputActionForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const {appKey} = useParams();

  const [combinedFormData, setCombinedFormData] = useState({
    actionFormData: {
      name: '',
      Key: '',
      Description: '',
    },
    inputActionData: [
      {
        label: '',
        key: '',
        type: '',
        required: false,
        description: '',
        variables: false,
      },
    ]
  });

  useEffect(() => { 
    const locationState = location.state as State["actionFormData"];
    const { name , key , description } = locationState;
    console.log(name,key,description);
    setCombinedFormData((prevData) => ({
      ...prevData,
      actionFormData: {
        name: name || '',
        Key: key || '',
        Description: description || '',
      },
   }));
  }, [location]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >,
    index: number
  ) => {
    const { name, value, type } = event.target;
  
    if (type === 'checkbox') {
      const checked = (event.target as HTMLInputElement).checked;
  
      setCombinedFormData((prevData) => ({
        ...prevData,
        inputActionData: prevData.inputActionData.map((item, i) =>
          i === index
            ? {
                ...item,
                [name.split('-')[0]]: checked,
              }
            : item
        ),
      }));
    } else {
      setCombinedFormData((prevData) => ({
        ...prevData,
        inputActionData: prevData.inputActionData.map((item, i) =>
          i === index
            ? {
                ...item,
                [name.split('-')[0]]: value,
              }
            : item
        ),
      }));
    }
  };
  const handleSelectChange = (
    event: SelectChangeEvent<string>,
    index: number
  ) => {
    const selectedType = event.target.value;
  
    setCombinedFormData((prevData) => ({
      ...prevData,
      inputActionData: prevData.inputActionData.map((item, i) =>
        i === index
          ? {
              ...item,
              type: selectedType,
            }
          : item
      ),
    }));
  };
  

  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    navigate(URLS.NEW_INTEGRATION_ACTION_PAGE2(appKey), {
      state: combinedFormData,
    });
    console.log(combinedFormData, combinedFormData.inputActionData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Input Field
      </Typography>
      <form onSubmit={handleSubmit}>
        {combinedFormData.inputActionData.map((item, index) => (
          <div key={index}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={`label-${index}`}>Label:</label>
              <TextField
                name={`label-${index}`}
                fullWidth
                required
                value={item.label}
                onChange={(event) => handleInputChange(event, index)}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={`key-${index}`}>Key:</label>
              <TextField
                name={`key-${index}`}
                fullWidth
                required
                value={item.key}
                onChange={(event) => handleInputChange(event, index)}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor={`description-${index}`}>Description:</label>
              <TextField
                name={`description-${index}`}
                fullWidth
                required
                value={item.description}
                onChange={(event) => handleInputChange(event, index)}
                margin="dense"
                size="small"
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
          <label htmlFor={'type-${index}'}>Type:</label>
          <FormControl fullWidth>
            <Select
              name="type"
              value={item.type} 
              onChange={(event) => handleSelectChange(event, index)} 
              margin="dense"
              size="small"
            >
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="dropdown">Dropdown</MenuItem>
              <MenuItem value="dynamic">Dynamic</MenuItem>
            </Select>
          </FormControl>
        </div>
            <div style={{ marginBottom: '8px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={`required-${index}`}
                    checked={item.required}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                }
                label="Required"
              />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={`variables-${index}`}
                    checked={item.variables}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                }
                label="Variables"
              />
            </div>
          </div>
        ))}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create
        </Button>
      </form>
    </Paper>
  );
}

export default InputActionForm;
