import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

//*********USED FOR MULTISELECT COMPONENT*******//
//
//* this function is passed into the MultiSelect component
// and is called when tags are added/removed from the dropdown
// to update state of tagSelection.

// const tagSelection = (tagSelection) => {
//   console.log("in tagSelection", tagSelection);
//   return setTag(tagSelection);
// };

//* sets props object to be passed into the MultiSelect component
// tags expects an array formatted as the tags array from the redux store

// let props = {
//   tags,
//   tagSelection,
// };

//* call MultiSelect where desired and pass through props

// <MultiSelect props={props} />

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({ props, tg }) {
  console.log(tg);
  console.log("Props are >>>>>>>>>", props);
  const [tagName, setTagName] = React.useState([]);
  const [tagIds, setTagIds] = React.useState([]);

  const tagSelection = props.tagSelection;

  const tags = props.tags;
  let value;
  const handleChange = (event) => {
    console.log("in multiselect handle change", tags);
    const {
      target: { value },
    } = event;
    setTagName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const values = [];
    props.tags.map((tag) => {
      return value.map((val) => {
        val === tag.name && values.push(tag.id);
      });
    });
    tagSelection(values);
  };

  return (
    props.tags.length > 0 && (
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            name="testingNAME"
            defaultValue={tg}
            multiple
            value={tagName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {props.tags.map((name) => (
              <MenuItem key={name.name} value={name.name}>
                <Checkbox checked={tagName.indexOf(name.name) > -1} />
                <ListItemText primary={name.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  );
}
