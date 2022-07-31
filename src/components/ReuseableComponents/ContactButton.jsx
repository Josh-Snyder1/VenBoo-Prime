import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

function ContactButton({contactProps}) {

    //this component handles the contact button used throughout the project
    //props are passed in defining the email list to send to
    //and the text to display in the button

    const user = useSelector((store) => store.user);

    return (
          <Button 
            onClick={() => window.location = 
            `mailto:${contactProps.emails}`} 
            variant="contained">
            {contactProps.buttonText ? contactProps.buttonText : 'Contact'}
        </Button>
    );
  }
  
  export default ContactButton;