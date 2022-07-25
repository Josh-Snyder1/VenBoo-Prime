import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function EventDetails() {

    const eventDetails = useSelector((store) => store.events);
    const dispatch = useDispatch();
    const history = useHistory();

    // dispatch({
    //     type: FETCH_DETAILS,
    //     payload: response.data
    // })

    return (
        <>
      <h1>Farm Fest</h1>
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
                {eventDetails.map((items)=>{
                    <tr key={eventDetails.id}>
                        <td></td>

                    </tr>
                })}
            </tbody>

        </table>







      </div>
        </>
    )
}
export default EventDetails;