
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [secondary, setSecondary] = React.useState(false);
  const dispatch = useDispatch();
//   let [edit, setEdit] = React.useState(false);

  const tags = useSelector(store => store.tags);

   const [edit, setEdit] = React.useState();
    const [newTag, setNewTag] = React.useState();

  function editTag(id){
     setEdit(id);
    console.log('in editTag', edit)
  }

  function deleteTag(id){
    dispatch({ type: 'DELETE_TAG', payload: {id}})
  }

  const handleChange = event => {
      setNewTag(event.target.value)
  }

  function updateTag(id) {
      dispatch({ type: 'EDIT_TAG', payload: {id,newTag}})
      console.log(id,newTag)
    setEdit('');
  }

  useEffect(() => {
  }, []);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography>
          <Demo>
            <List>
            {tags.map(tag => {
                return(
                <ListItem key={tag.id}>
                    {edit === tag.id ?
                    <>
                    <input defaultValue={tag.name} onChange={handleChange}    ></input>
                    <IconButton edge="end" aria-label="update" onClick={() => {updateTag(tag.id)}}>
                        <CheckBoxIcon sx={{marginRight:'10px', marginLeft:'10px'}} />
                        </IconButton>
                    <IconButton edge="end" aria-label="edit" onClick={() => {deleteTag(tag.id)}}>
                            <DeleteIcon sx={{marginRight:'10px', marginLeft:'10px'}}/>
                        </IconButton>

                    </>
                    :
                    <>
                    <ListItemText
                        key={tag.id}
                        id={tag.id}
                        primary={tag.name}
                    />
                        <IconButton edge="end" aria-label="edit" onClick={() => {editTag(tag.id, tag.name)}}>
                            <EditIcon sx={{marginRight:'10px', marginLeft:'10px'}}/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => {deleteTag(tag.id)}}>
                        <DeleteIcon sx={{marginRight:'10px', marginLeft:'10px'}} />
                        </IconButton>
                        </>
                    }
                </ListItem>
            )
            })}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
