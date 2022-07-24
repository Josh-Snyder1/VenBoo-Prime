import { useSelector } from "react-redux";
import moment from "moment";

function EventsList() {
    const allEvents = useSelector((store) => store.events);
    const user = useSelector((store) => store.user);

    console.log(allEvents);

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
    else if (user.type === 'vendor') {
        return (
            <>
                <p>Hello World</p>
            </>
        )
    }

}
export default EventsList;