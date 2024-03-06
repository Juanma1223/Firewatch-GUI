import "./containersConfig.css"
import { Box } from "@mui/system";
import { TextField, Paper, Switch, Divider, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function ContainersConfig() {

    const [host, setHost] = useState('');
    const [watchAll, setWatchAll] = useState(false);
    const [restartContainers, setRestartContainers] = useState(false);
    const [sendAlerts, setSendAlerts] = useState(false);

    const handleHostName = (e) => {
        setHost(e.target.value);
    }

    const handleWatchAllContainers = (e) => {
        setWatchAll(e.target.checked);
    }
    
    const handleRestartContainers = (e) => {
        setRestartContainers(e.target.checked);
    }

    const handleSendAlerts = (e) => {
        setSendAlerts(e.target.checked);
    }

    const updateContainersInfo = () => {
        const url = window.location.href;
        // const url = "https://lila.com.ar/firewatch"
        const splittedDomain = url.split("/");
        const domain = splittedDomain[0] + "//" + splittedDomain[2];
        console.log(domain);
        // const endpoint = domain + "/api/docker-firewatch/containers";
        const endpoint = "http://localhost:4200/api/docker-firewatch/containers"
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
                hostMachine: host,
                watchAllContainers: watchAll,
                restartContainers: restartContainers,
                sendAlert: sendAlerts,
                watchedContainers: []
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
                    <TextField label="Host machine" variant="standard" onChange={handleHostName}></TextField>
                    <p>Watch all containers: <Switch onChange={handleWatchAllContainers}></Switch></p>
                    <p>Restart stopped containers: <Switch onChange={handleRestartContainers}></Switch></p>
                    <p>Send alerts: <Switch onChange={handleSendAlerts}></Switch></p>
                    <Button onClick={updateContainersInfo}>Save configuration</Button>
                </Paper>
            </div>
        </>
    );
}

export default ContainersConfig;