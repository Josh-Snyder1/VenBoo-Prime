import { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

function EventsList() {
    const user = useSelector((store) => store.user);
    const vendorBooths = useSelector((store) => store.booths);
    const allEvents = useSelector((store) => store.events);
    // Today's date
    const todayDate = moment().format('YYYYMMDD');

    const [viewEvents, setViewEvents] = useState('');

    // EventList render if user is a "Host".
    if(user.type === 'host') {
        return (
            <>
                <button onClick={() => setViewEvents('')}>Upcoming</button>
                <button onClick={() => setViewEvents('past')}>Past</button>

                {allEvents.map((itemEvent) => {
                    if(
                        itemEvent.user_id === user.id
                        &&
                        viewEvents === 'past'
                        &&
                        Number(moment(itemEvent.start_date).format('YYYYMMDD')) < Number(todayDate)
                    ){
                        return (
                            <div key={itemEvent.id}>
                                <br/>
                                <h4>{itemEvent.name}</h4>
                                <ul>
                                    <li>{moment(itemEvent.start_date).format('MMM DD YYYY')} - {moment(itemEvent.end_date).format('MMM DD YYYY')}</li>
                                    <li>{itemEvent.description}</li>
                                    <li>Past Event</li>
                                </ul>
                            </div>
                        )
                    }
                    else if (
                        itemEvent.user_id === user.id
                        &&
                        viewEvents === ''
                        &&
                        Number(moment(itemEvent.start_date).format('YYYYMMDD')) > Number(todayDate)
                    ){
                        return (
                            <div key={itemEvent.id}>
                                <br/>
                                <h4>{itemEvent.name}</h4>
                                <ul>
                                    <li>{moment(itemEvent.start_date).format('MMM DD YYYY')} - {moment(itemEvent.end_date).format('MMM DD YYYY')}</li>
                                    <li>{itemEvent.description}</li>
                                    <li>Upcoming</li>
                                </ul>
                            </div>
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
                <br/>
                {vendorBooths.map((booth) => {
                    return (
                        <div key={booth.id}>
                            <h4>{booth.name}</h4>
                            <ul>
                                <li>Type: {booth.type}</li>
                                <li>Dimensions: {booth.dimensions}</li>
                                <li>Quantity: {booth.quantity}</li>
                                <li>Description: {booth.description}</li>
                                <li>Cost: ${booth.cost}</li>
                                <li>Requested on: {moment(booth.requested_on).format('MMM DD YYYY')}</li>
                                {booth.approved_by_host && 
                                    <li>Application Status: Approved ✅</li>
                                }
                                {!booth.approved_by_host &&
                                    <li>Application Status: Pending ❌</li>
                                }
                            </ul>
                            <br/>
                        </div>
                    )
                })}
            </>
        )
    }

}
export default EventsList;