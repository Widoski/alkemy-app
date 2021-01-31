import React, { useState } from 'react';
import { Tabs, Tab, Grid } from '@material-ui/core';
import RegistersIncome from './RegistersIncome.js';
import RegistersOutcome from './RegistersOutcome.js';
import RegistersByCategory from './RegistersByCategory';
import Appbar from '../Appbar';

export default function TabPanel(props) {
    const [value, setValue] = useState(0);

    const handleChange = (e, id) => {
        setValue(id);
    };

    return (
        <Grid item xs={12} style={{ background: "#f5f5f5" }}>
            <Appbar title="My registers">
                <Tabs value={value} onChange={handleChange} centered={true}>
                    <Tab label="Income" value={0} />
                    <Tab label="Outcome" value={1} />
                    <Tab label="Expenses by category" value={2} />
                </Tabs>
                <Registers value={value} id={0}>
                    <RegistersIncome properties={props} />
                </Registers>
                <Registers value={value} id={1}>
                    <RegistersOutcome properties={props} />
                </Registers>
                <Registers value={value} id={2} >
                    <RegistersByCategory properties={props} />
                </Registers>
            </Appbar>
        </Grid>
    );
};

const Registers = ({ id, value, children }) =>
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
);


