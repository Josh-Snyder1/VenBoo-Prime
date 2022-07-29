import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function EventDetails({ id }) {

    const eventBoothDetails = useSelector((store) => store.eventbooths);
    // const tagsBooth = useSelector((store)=> store.tagsReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const [viewList, setViewList] = useState('');

    // delete booth handle
    const handleDelete = () => {
        dispatch({
            type: 'DELETE_BOOTH',
                    payload: {
                        id
                    }
        });
        console.log("-------> delete booths ",id)
      };
    // function deleteBooth(id) {
    //     dispatch({
    //         type: 'DELETE_BOOTH',
    //         payload: {
    //             id
    //         }
    //     })
    // }
    
    // edit put booth


console.log('event booth', eventBoothDetails);
// console.log('tags event booth', tagsBooth);
    return (
        // adding booths and available booths
        <>
      <h1>Available Booths</h1>
      <div>
      <button>Add Booth Type</button>
        <table className='booths info'>
            
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
        
      <div>
      
      
        <h1>Pending Approval</h1>
        <table className="pending">
                <thead>
                    <tr>
                        <th>Vendor Name</th>
                        <th>Tags</th>
                        <th>Booth Size</th>
                    </tr>
                </thead>
                




                <tbody>
                    {eventBoothDetails.map((booths)=> {
                        
                        return(
                            <tr key={booths.id}> 
                                <td>{booths.business_name}</td>
                                <td>{booths.tags}</td>
                                <td>{booths.dimensions}</td>
                                <button>✅</button>
                                <button onClick={handleDelete} >❌</button>
                            </tr>
                        )
                    })}
                </tbody>
        </table>
      </div>





      <div>
        <h1>Approved</h1>
        <table className="approved">
                <thead>
                    <tr>
                        <th>Vendor Name</th>
                        <th>Tags</th>
                        <th>Booth Size</th>
                        <th>Description</th>
                    </tr>
                </thead>
                
                
                <tbody>
                    {eventBoothDetails.map((list)=> {
                        if (list.approved_by_host &&
                            list.user_id === user.id &&
                            list.verified
                            )
                        return(
                            <tr key={list.id}>
                                <td>{list.business_name}</td>
                                <td>{list.tags}</td>
                                <td>{list.dimensions}</td>
                                <td>{list.description}</td>
                            </tr>
                        )
                    })}
                </tbody>
        </table>
      </div>
        </>
    )
}
export default EventDetails;