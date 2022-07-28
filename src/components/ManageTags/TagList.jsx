
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

    const dispatch = useDispatch();

    //pull tags from redux store
    const tags = useSelector(store => store.tags);

    //initialize local state variables for edit to toggle between view and edit mode
    //and new tag for updated tag value
    const [edit, setEdit] = React.useState();
    const [newTag, setNewTag] = React.useState();

    //when delete button is clicked a dispatch is sent to remove the clicked tag from database
    function deleteTag(id){
        dispatch({ type: 'DELETE_TAG', payload: {id}})
    }

    //when edit is clicked, edit value will update to the id of the line item 
    //allowing that line to conditionally render as clicked.
    function editTag(id){
        setEdit(id);
    }

    //after edit button has been clicked and the input box is updated, this value updates
    const handleChange = event => {
        setNewTag(event.target.value)
    }

    //when checkmark is clicked to update tag this function is called
    function updateTag(id, tag) {
        // check to see if newTag is undefined (hasn't been updated) and ends function
        if (!newTag) {
            setEdit('')
            return
        }else {
        //if newTag has been changed, then dispatch that new tag name to database to update
        dispatch({ type: 'EDIT_TAG', payload: {id,newTag}})
        }
        setEdit('');
    }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography>
          <Demo>
            <List>
                {/* map through the tags array to display each tag in list veiw */}
            {tags.map(tag => {
                return(
                <ListItem key={tag.id}>
                    {/* ternary to check if the edit value is the same as the tag id which
                    would indicate that the edit button has been clicked */}
                    {edit === tag.id ?
                    <>
                    {/* if edit button has been clicked, display input box, checkbox and delete icon */}
                    <input defaultValue={tag.name} onChange={handleChange}    ></input>
                    <IconButton edge="end" aria-label="update" onClick={() => {updateTag(tag.id, tag.name)}}>
                        <CheckBoxIcon sx={{marginRight:'10px', marginLeft:'10px'}} />
                        </IconButton>
                    <IconButton edge="end" aria-label="edit" onClick={() => {deleteTag(tag.id)}}>
                            <DeleteIcon sx={{marginRight:'10px', marginLeft:'10px'}}/>
                        </IconButton>

                    </>
                    :
                    // normal render of tag name, edit pencil and delete icon
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
