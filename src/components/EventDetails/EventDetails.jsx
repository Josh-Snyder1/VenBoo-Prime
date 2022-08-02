import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './EventDetails.css'
// MUI
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function EventDetails() {

    function createData(vendor, tags, booth, description ) {
        return { vendor, tags, booth, description };
      }

    const eventBoothDetails = useSelector((store) => store.boothApplications);
    // const tagsBooth = useSelector((store)=> store.tagsReducer);
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const history = useHistory();
    const [viewList, setViewList] = useState(''); 

    // delete booth handle

    function handleDelete(id) {
        dispatch({
          type: "DELETE_BOOTH",
          payload: {id: booths.booth_id}
        });
        console.log("delete booth>>>>>>>", id);
      };

    
    // edit put booth

    const { eventId } = useParams();


    useEffect(() => {
        dispatch({
            type: "FETCH_VENDOR_BOOTH_APPLICATIONS",
            payload: {
                id: eventId,
            }
        })
      }, [eventId]);

 

    console.log('event booth', eventBoothDetails);
    // console.log('tags event booth', tagsBooth);
    
    return (
        // adding booths and available booths
        <>
      <h1>Available Booths</h1>
      <div>
        <button>Add Booth Type</button>
        <table className='booths_info'>
            
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Available</th>
                    <th>Dimensions</th>
                    <th>Info</th>
                    <th>Cost</th>
                    <button>Edit</button>
                </tr>
            </thead>
         
            <tbody>
                {eventBoothDetails.map((items)=>{
                   return (
                    <tr key={items.id}>
                    <td>{items.type}</td>
                    <td>{items.quantity}</td>
                    <td>{items.dimensions}</td>
                    <td>{items.description}</td>
                    <td>{items.cost}</td>
                </tr>
                   )
                })}
            </tbody>
            
        </table>
      </div>
        
    <TableContainer component={Paper} >
        <h2>Pending Approval</h2>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="pending">
                <TableHead>
                    <TableRow>
                        <TableCell>Vendor Name</TableCell>
                        <TableCell>Tags</TableCell>
                        <TableCell>Booth Size</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {eventBoothDetails.map((booths)=> {
                        console.log('booth id is>>>>>', booths.booth_id);
                        return(
                            
                        
                            <TableRow key={booths.id}> 
                            
                                <TableCell >{booths.business_name}</TableCell>
                                <TableCell>{booths.tags}</TableCell>
                                <TableCell>{booths.dimensions}</TableCell>
                                <Stack direction="row" spacing={2}></Stack>
                                <Button size="small" variant="outlined" >Approve</Button>
                                <Button size="small" variant="outlined" startIcon={<DeleteIcon />} onClick={ () => dispatch({type: 'DELETE_BOOTH', payload: {id: booths.booth_id} })} >Delete</Button>
                    
                            </TableRow>
                            )
                        })}
                        </TableBody>
        </Table>
                        
      </TableContainer>

      <TableContainer component={Paper}>
        <h2>Approved</h2>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="approved">
                <TableHead>
                    <TableRow>
                        <TableCell > Vendor Name</TableCell>
                        <TableCell> Tags</TableCell>
                        <TableCell> Booth Size</TableCell>
                        <TableCell> Description</TableCell>
                    </TableRow>
                </TableHead>
                
                
                <TableBody>
                    {eventBoothDetails.map((list)=> {
                        if (list.approved_by_host &&
                            list.id === user.id &&
                            list.verified
                            )
                        return(
                            <TableRow key={list.id}>
                                <TableCell >{list.business_name}</TableCell >
                                <TableCell >{list.tags}</TableCell >
                                <TableCell >{list.dimensions}</TableCell >
                                <TableCell >{list.description}</TableCell >
                                <Button variant="outlined" disabled>Approved</Button>
                            </TableRow>
                        )
                    })}
                </TableBody>
        </Table>
      </TableContainer>
        </>
    )
                
}
export default EventDetails;