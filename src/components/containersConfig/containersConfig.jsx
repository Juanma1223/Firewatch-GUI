import "./containersConfig.css"
import { Box } from "@mui/system";
import { TextField, Paper, Switch, Divider, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../service/constants";

function ContainersConfig() {

    const [host, setHost] = useState('');
    const [watchAll, setWatchAll] = useState(false);
    const [restartContainers, setRestartContainers] = useState(false);
    const [sendAlerts, setSendAlerts] = useState(false);

    useEffect(() => {
        getContainersConf();
        return () => {
        }
    }, [])


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
        const endpoint = BASE_URL + "/api/docker-firewatch/containers"
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

    const getContainersConf = () => {
        axios.get(BASE_URL + "/api/docker-firewatch/containers", {
            auth: {
                username: 'lila',
                password: 'manzanohistorico29'
            }
        })
            .then(function (response) {
                console.log(response);
                setHost(response.data.data.hostMachine);
                setWatchAll(response.data.data.watchAllContainers);
                setRestartContainers(response.data.data.restartContainers)
                setSendAlerts(response.data.data.sendAlert);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            <div className="container">
                <Paper elevation={10} className="card">
                    <TextField defaultValue="Host Name" label="Host machine" variant="standard" value={host} onChange={handleHostName}></TextField>
                    <p>Watch all containers: <Switch checked={watchAll} onChange={handleWatchAllContainers}></Switch></p>
                    <p>Restart stopped containers: <Switch checked={restartContainers} onChange={handleRestartContainers}></Switch></p>
                    <p>Send alerts: <Switch checked={sendAlerts} onChange={handleSendAlerts}></Switch></p>
                    <Button onClick={updateContainersInfo}>Save configuration</Button>
                </Paper>
            </div>
        </>
    );
}

export default ContainersConfig;