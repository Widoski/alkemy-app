import React, { useState } from 'react';
import { Tabs, Tab, Grid, AppBar } from '@material-ui/core';
import RegistersIncome from './RegistersIncome.js';
import RegistersOutcome from './RegistersOutcome.js';
import Appbar from './Appbar';

export default function TabPanel(props) {
    const [value, setValue] = useState(0);

    const handleChange = (e, id) => {
        setValue(id);
    };

    return (
        <Grid item xs={12} style={{ background: "#f5f5f5" }}>
            <Appbar title="My registers">
                <Tabs value={value} onChange={handleChange} centered={true}>
                    <Tab label="Ingresos" value={0} />
                    <Tab label="Egresos" value={1} />
                </Tabs>
                <Projects value={value} id={0}>
                    <RegistersIncome properties={props} />
                </Projects>
                <Projects value={value} id={1}>
                    <RegistersOutcome properties={props} />
                </Projects>
            </Appbar>
        </Grid>
    )
}

const Projects = ({ id, value, children }) =>
(
    <>
        {
            value === id ? (
                <Grid container item xs={12}>
                    {children}
                </Grid>
            ) : null
        }
    </>
)


