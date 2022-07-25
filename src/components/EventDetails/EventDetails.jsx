import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function EventDetails() {

    const eventBoothDetails = useSelector((store) => store.eventbooths);
    const dispatch = useDispatch();
    const history = useHistory();


console.log('event booth', eventBoothDetails)
    return (
        <>
      <h1>Available Booths</h1>
      <div>
        <table className='eventdetails'>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Available</th>
                    <th>Dimensions</th>
                    <th>Info</th>
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