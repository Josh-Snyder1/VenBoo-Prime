import { useSelector } from "react-redux";
import moment from "moment";

function EventsList() {
    const allEvents = useSelector((store) => store.events);
    const user = useSelector((store) => store.user);
    const vendorBooths = useSelector((store) => store.booths)

    // EventList render if user is a "Host".
    if(user.type === 'host') {
        return (
            <>
                {allEvents.map((itemEvent) => {
                    if(itemEvent.user_id === user.id){
                        return (
                            <ul key={itemEvent.id}>
                                 <li>{itemEvent.name}</li>
                                 <li>{moment(itemEvent.start_date).format('MMM DD YYYY')} - {moment(itemEvent.end_date).format('MMM DD YYYY')}</li>
                                 <li>{itemEvent.description}</li>
                            </ul>
                        )
                    }
                })}
            </>
        )
    }
    // EventList render if User is a "Vendor".
    else if (user.type === 'vendor') {
        return (
            <>
                <br/>
                <h3>Your Booths</h3>
                {vendorBooths.map((booth) => {
                    return (
                        <ul key={booth.id}>
                            <li>Event Name: {booth.name}</li>
                            <li>Type: {booth.type}</li>
                            <li>Dimensions: {booth.dimensions}</li>
                            <li>Quantity: {booth.quantity}</li>
                            <li>Description: {booth.description}</li>
                            <li>Cost: ${booth.cost}</li>
                        </ul>
                    )
                })}
            </>
        )
    }

}
export default EventsList;