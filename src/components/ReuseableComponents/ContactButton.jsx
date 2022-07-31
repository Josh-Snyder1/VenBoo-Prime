import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

function ContactButton({contactProps}) {


    // const emails = ['joshrsnyder@gmail.com', 'skaterphil741@yahoo.com']

    function handleEmail(emails) {

    }
    console.log

    const user = useSelector((store) => store.user);

    return (
          <Button onClick={() => window.location = `mailto:${contactProps.emails}`} variant="contained">{contactProps.buttonText}</Button>
    );
  }
  
  export default ContactButton;