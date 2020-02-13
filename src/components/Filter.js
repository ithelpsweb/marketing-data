import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function Filter(props) {

  function createMenuItems(data) {
    var arr = [];
    for (let i = 0; i < data.length; i++) {
        if(data[i])
        arr.push(<MenuItem key={data[i]} value={data[i]}>{data[i]}</MenuItem>)
    }
    return arr;
  }
  
  return(
    <div>
    <FormControl >
      <InputLabel id="demo-simple-select-label">Datasource</InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select"
        value={props.selected} onChange={props.onChange} >
        <MenuItem value={'All'}>All</MenuItem>
        {createMenuItems(props.selectData)}
      </Select>
    </FormControl>
    </div>
  )
}
