import React,{ useState, useEffect }  from 'react';
import { readString } from 'react-papaparse';
import LineGraph from './components/LineGraph';
import Filter from './components/Filter';
import Chips from './components/Chips';
import './App.css';
import axios from "axios";
var _ = require('lodash');



export default function App() {

  const [fetchedData, setfetchedData] = useState('');
  const [labels, setlabels] = useState(['Clicks','Impressions']);
  const [cleanData, setCleanData] = useState([]);
  const [filter, setFilter] = useState({Datasource:'All'});
  const [errors, setErrors] = useState('');

  const mainDataLabel = 'Datasource';
  const secondDataLabel = 'Campaign';
  const dataSourceUrl = "http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv";

  useEffect(() => {
   axios
     .get(dataSourceUrl)
     .then(({ data }) => {
       data = cleanFetchedData(readString(data).data)
       setfetchedData(data);
       setCleanData(sumData(data));
     })
     .catch(error => {
        setErrors('Sorry we have a problem with data fetching... Please try again later.');
      });
  }, []);


  function cleanFetchedData(raw_data){
    const header = raw_data[0];
    var cleanData = [];
    if(raw_data && raw_data.length>1){
      for(var i=1;i<raw_data.length;i++){
        let row = {}
        for(var j=0;j<header.length;j++){
          if(!isNaN(raw_data[i][j]) && raw_data[i][j]!=''){
            row[header[j]] = parseInt(raw_data[i][j]);
          }
          else
            row[header[j]] = raw_data[i][j];
        }
        cleanData.push(row);
      }
    }
    return cleanData;
  }

  function filterData(data,key,value){
    let json = { };
    json[key] = value;
    return _.filter(data,json);
  }

  function applyFilter(){
    var data_tmp = [];
    if(filter.Datasource){
      if(filter.Datasource!='All')
        data_tmp  = filterData(fetchedData,mainDataLabel,filter.Datasource);
      else {
        data_tmp  = fetchedData;
      }
    }

    if(filter.Campaign){
      for(var i=0;i<filter.Campaign.length;i++){
        const d = filterData(data_tmp,secondDataLabel,filter.Campaign[i]);
        data_tmp = {...data_tmp,d};
      }
    }
    setCleanData(sumData(data_tmp));
  }

  const handleFilterChange = ((newValue) => {
    var temp_filter = filter;
    temp_filter.Datasource = newValue.target.value;
    setFilter(temp_filter);
    applyFilter();
  })

  const handleChipChange = ((values) => {
    var filterCampaigns = [];
    for(var i=0;i<values.length;i++){
      filterCampaigns = [...filterCampaigns,values[i]];
    }
    var temp_filter = filter;
    temp_filter[secondDataLabel]=filterCampaigns
    setFilter(temp_filter)
    applyFilter();
  })

  const sumData = (cleanData) => {
    return _(cleanData)
    .groupBy('Date')
    .map((objs, key) => ({
        'Date': key,
        'Impressions': _.sumBy(objs, 'Impressions')/1000,
        'Clicks': _.sumBy(objs, 'Clicks'),
      }))
    .value();
  }

 const dataSourcesList = _.uniq(_.map(fetchedData, mainDataLabel));
 const dataCampaignsList = _.uniq(_.map(fetchedData, secondDataLabel))

  return (
    <div style={{width:'900px',maxWidth:'100%',margin:"auto"}}>
      <p style={{color:'red'}}>{errors}</p>
      <div style={{width:'100%',marginBottom:'20px'}}>
        <Chips selectData={dataCampaignsList} onChange={handleChipChange} />
        <Filter selectData={dataSourcesList} selected={filter.Datasource} onChange={handleFilterChange} />

      </div>
      <div>
        <LineGraph data={cleanData} labels={labels} style={{width:'100%'}}/>
      </div>
    </div>
  );
}
