import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


import AvailableBooths from './AvailableBooths/AvailableBooths'

function EventDetails() {


    const eventBoothDetails = useSelector((store) => store.boothApplications);
    // const tagsBooth = useSelector((store)=> store.tagsReducer);
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const events = useSelector((store) => store.events);
    const history = useHistory();
    const [viewList, setViewList] = useState('');

    // delete booth handle
    // function deleteBooth(id){
    //     dispatch({ type: 'DELETE_BOOTH', payload: {id}})
    //   }

    function handleDelete(id) {
        dispatch({
          type: "DELETE_BOOTH",
          payload: { id }
        });
        console.log("delete booth>>>>>>>", id);
      };
    
    // edit put booth

    const { eventId } = useParams();
    // console.log(eventId)

    //   deleteProps={
    //       id: booths.id,
    //       dispatchName: 'DELETE_BOOTH_APPLICATION'
    //   }

    // <DeleteButton props={deleteProps} />

    // console.log('event booth', eventBoothDetails)

    useEffect(() => {
        dispatch({
            type: "FETCH_VENDOR_BOOTH_APPLICATIONS",
            payload: {
                id: eventId,
            }
        })
      }, [eventId]);

    //   console.log('testing', events.filter(event => event.id === Number(eventId)).pop())
// console.log('tags event booth', tagsBooth);

    return (
        
        <>
      <AvailableBooths props={ events.filter(event => event.id === Number(eventId)).pop() }/>
      
      <Header />

      <h1>
        <br /> Address(123 First Ave Roseville, MN 55407)
      </h1>
      <h2>Selector (Tags)</h2>
      {/* <form onSubmit={}>

              </form> */}
      <h1>Available Booths</h1>

      <div>
        <button>Add Booth Type</button>

        <table className="booths info">
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
            {eventBoothDetails.map((items) => {
              return (
                <tr key={items.id}>
                  <td>{items.type}</td>
                  <td>{items.quantity}</td>
                  <td>{items.dimensions}</td>
                  <td>{items.description}</td>
                  <td>{items.cost}</td>
                </tr>
              );
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
            {eventBoothDetails.map((booths) => {
              return (
                <tr key={booths.id}>
                  <td>{booths.business_name}</td>
                  <td>{booths.tags}</td>
                  <td>{booths.dimensions}</td>
                  <button>✅</button>
                  <button onClick={() => handleDelete(booths.id)}>❌</button>
                </tr>
              );
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
            {eventBoothDetails.map((list) => {
              if (list.approved_by_host && list.id === user.id && list.verified)
                return (
                  <tr key={list.id}>
                    <td>{list.business_name}</td>
                    <td>{list.tags}</td>
                    <td>{list.dimensions}</td>
                    <td>{list.description}</td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default EventDetails;
