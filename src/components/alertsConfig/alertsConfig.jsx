import "./alertsConfig.css"
import { Box } from "@mui/system";
import { TextField, Paper, Switch, Divider, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function AlertsConfig() {

    const [slackWebhook, setSlackWebhook] = useState('');
    const [logsNumber, setLogsNumber] = useState(5);

    const handleSlackWebhook = (e) => {
        setSlackWebhook(e.target.value);
    }

    const handleLogsNumber = (e) => {
        setLogsNumber(e.target.value);
    }

    const updateAlertsConfig = () => {
        const url = window.location.href;
        // const url = "https://lila.com.ar/firewatch"
        const splittedDomain = url.split("/");
        const domain = splittedDomain[0] + "//" + splittedDomain[2];
        console.log(domain);
        // const endpoint = domain + "/api/docker-firewatch/containers";
        const endpoint = "http://localhost:4200/api/docker-firewatch/alerts"
        console.log(endpoint)
        axios({
            url: endpoint,
            method: 'post',
            mode: 'cors',
            withCredentials: false,
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            data: JSON.stringify({
                slackWebhook: slackWebhook,
                logsTail: logsNumber
            }),
        }
        )
            .then(alert('Configuration saved succesfully'))
            .catch((err) => console.log(err));

    }

    return (
        <>
            <div className="container">
                <Paper elevation={10} className="card">
                    <TextField label="Host machine" variant="standard" onChange={handleSlackWebhook}></TextField>
                    <TextField label="Docker logs quantity" variant="standard" onChange={handleLogsNumber}></TextField>
                    <Button className="saveButton" onClick={updateAlertsConfig}>Save configuration</Button>
                </Paper>
            </div>
        </>
    );
}

export default AlertsConfig;