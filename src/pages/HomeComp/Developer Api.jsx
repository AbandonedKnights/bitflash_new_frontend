import Footer from "./Footer";
import Header from "./Header";

import axios from "axios";

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import JSONPretty from "react-json-pretty";
import 'react-json-pretty/themes/monikai.css';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    var JSONPrettyMon = require('react-json-pretty/dist/monikai');
    

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Api() {
    const [value, setValue] = React.useState(0);
    const [docs, setDocs] = useState([''])
    useEffect(() => {
        axios.get('https://api.kingvrx.com/api/getapi-docs').then((data) => {
            console.log(data.data.data)
            setDocs(data.data.data)
        })
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>

        <Box
            sx={{ flexGrow: 1, backgroundColor: '#f1f1f1', display: 'flex', height: "100vh", margin:"0", width: "100%", }}
        >
            <Tabs  style={{  width:"80vw"}} className=" "
                orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: 'divider' }}
            >

                {docs?.map((docItem) => (
                    <Tab label={docItem.heading} />
                ))}
            </Tabs>
            <TabPanel value={value} index={0}>

            </TabPanel>
            {docs?.map((docItem, index) => (
                <TabPanel value={value} index={index}>
                    <div className=" container-fluid" style={{  width:"80vw"}} >
                        <div className="row">
                            <div className="col-sm-6 "  >
                                <h2 className=""> {docItem?.heading}</h2>
                                <h3 className=""> {docItem?.title}</h3>
                                <p className=""> {docItem?.url}</p>
                                <div className="">
                                    <h3>Parameters</h3>
                                    <table className="table table-responsive">
                                        <tbody>
                                            {docItem?.parameters?.map((params) => (
                                                <tr className="text-dark">

                                                    <td>{params.name}</td>
                                                    <td>{params.type}</td>
                                                    <td>{params.mandatory}</td>
                                                    <td>{params.description}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="">
                                    <h3>Parameters</h3>
                                    <table className="table table-responsive">
                                        <tbody>
                                            {docItem?.parameters?.map((params) => (
                                                <tr className="text-dark">

                                                    <td>{params.name}</td>
                                                    <td>{params.type}</td>
                                                    <td>{params.mandatory}</td>
                                                    <td>{params.description}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>




                            </div>
                            <div className="col-sm-6 " >
                                <div className="" style={{ boxShadow: "1px 1px 5px" }}>

                             {/* { JSON.stringify(docItem.response)}
 */}
                             <JSONPretty id="json-pretty" data={docItem.response} ></JSONPretty>
                                </div>
                            </div>
                        </div>
                    </div>

                </TabPanel>
            ))}
        </Box>
{/* <Footer/> */}

        </> 
    );
}
