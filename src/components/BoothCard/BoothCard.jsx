// Imports
import { Card } from "@mui/material";
import moment from "moment";

function BoothCard({booths}) {
    if(booths !== []){
        return (
            booths.map((booth) => {
                return (
                    <Card
                        key={booth.id}
                        onClick={() => history.push(`/event/${booth.id}`)}
                        elevation={4}
                        sx={{
                            padding: "1em"
                        }}
                    >
                        <h3>{booth.name}</h3>
                        <h5>{moment(booth.start_date).format('MMM DD YYYY')} - {moment(booth.end_date).format('MMM DD YYYY')}</h5>
                        <ul>
                            <li>Type: {booth.type}</li>
                            <li>Dimensions: {booth.dimensions}</li>
                            <li>Quantity: {booth.quantity}</li>
                            <li>Description: {booth.description}</li>
                            <li>Cost: ${booth.cost}</li>
                            <li>Requested on: {moment(booth.requested_on).format('MMM DD YYYY')}</li>
                            {booth.approved_by_host === "APPROVED" ?
                                <li>Application Status: Approved ✅</li>
                            :
                                <li>Application Status: Pending ❌</li>
                            }
                        </ul>
                        <br/>
                    </Card>
                )
            })
        )
    }
    else{
        return (
            <></>
        )
    }
}
export default BoothCard;