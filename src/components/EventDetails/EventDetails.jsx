import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
function EventDetails() {

    const eventBoothDetails = useSelector((store) => store.eventbooths);
    const dispatch = useDispatch();
    const history = useHistory();

    const { eventId } = useParams();
    console.log(eventId)


    console.log('event booth', eventBoothDetails)

    dispatch({
        type: "FETCH_VENDOR_BOOTH_APPLICATIONS",
        payload: {
            id: eventId,
        }
    })


    return (
        <>
      <h1>Available Booths</h1>
      <div>
        <table className='booths'>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Available</th>
                    <th>Dimensions</th>
                    <th>Info</th>
                    <th>Cost</th>
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
        </table>
      </div>
        </>
    )
}
export default EventDetails;