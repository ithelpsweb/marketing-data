import React,{ useState }  from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function Chips(props) {
  const [tags, setTags] = useState([]);

  function onTagsChange(event, values) {
    setTags(values);
    props.onChange(values);
  };

  return (
    <div style={{ width: 500,clear:'both' }}>
      <Autocomplete
        multiple
        options={props.selectData ? props.selectData :[]}
        getOptionLabel={option => option}
        defaultValue={[]}
        onChange={onTagsChange}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            label="Campaign"
            placeholder="Select campaign"
            margin="normal"
            fullWidth
          />
        )}
      />
    </div>
  );
}
