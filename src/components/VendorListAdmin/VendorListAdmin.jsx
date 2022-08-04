// Imports
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

// MUI Imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function VendorListAdmin() {
    // Stores
    const vendors = useSelector((store) => store.vendors);

    // Vars
    const dispatch = useDispatch();
    const history = useHistory();

    // Functions
    useEffect(() => {
        dispatch({
            type: "FETCH_VENDORS"
        })
    }, [])

    // Render table of all vendor users.
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Business Name</TableCell>
                        <TableCell>Contact Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Tags</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Map through all vendors in store */}
                    {vendors.allVendors.map(vendor => {
                        return(
                            <TableRow
                                key={vendor.id}
                                onClick={() => history.push(`/profile/${vendor.id}`)}
                            >
                                <TableCell>{vendor.business_name}</TableCell>
                                <TableCell>{vendor.first_name} {vendor.last_name}</TableCell>
                                <TableCell>{vendor.city}, {vendor.state}</TableCell>
                                <TableCell>{vendor.phone}</TableCell>
                                <TableCell>
                                    {/* This one is weird, but it loops through the vendor's tag
                                        array, takes info from the tag object and returns a string
                                        of all the tag names */}
                                    {vendor.tags.reduce((acc, tag) => `${acc}${tag.name}, `,'')}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default VendorListAdmin;