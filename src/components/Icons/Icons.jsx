import React from "react";

import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import WebIcon from '@mui/icons-material/Web';

function Icons({profileInfo}) {
  return (
    <>
      {profileInfo.main_url &&
        <IconButton className="facebook">
          <a href={profileInfo.main_url} target="_blank">
            <WebIcon sx={{ color: "rgb(66 ,103 ,178)" }} />
          </a>
        </IconButton>
      }
      {profileInfo.facebook_url &&
        <IconButton className="facebook">
          <a href={profileInfo.facebook_url} target="_blank">
            <FacebookIcon sx={{ color: "rgb(66 ,103 ,178)" }} />
          </a>
        </IconButton>
      }
      {profileInfo.etsy_url &&
        <IconButton className="etsy">
          <a href={profileInfo.esty_url} target="_blank">
            <img
              src="data:image/png;base64,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"
              width="20px"
              height="20px"
            />
          </a>
        </IconButton>
      }
      {profileInfo.linkedin_url &&
        <IconButton className="linkedIn">
          <a href={profileInfo.linkedin_url} target="_blank">
            <LinkedInIcon sx={{ color: "rgb(10, 102, 194)" }} />
          </a>
        </IconButton>
      }  
      {profileInfo.instagram_url &&
        <IconButton className="instagram">
          <a href={profileInfo.instagram_url} target="_blank">
            <InstagramIcon color="secondary" />
          </a>
        </IconButton>
      }
      {profileInfo.pintrest_url &&
        <IconButton className="pintrest">
          <a href={profileInfo.pintrest_url} target="_blank">
            <PinterestIcon sx={{ color: "rgb(230, 0, 35)" }} />
          </a>
        </IconButton>
      }
    </>
  );
}

export default Icons;
