import "./alertsConfig.css"
import { Box } from "@mui/system";
import { TextField, Paper, Button, Slider, FormLabel } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../service/constants";

function AlertsConfig() {

    const [slackWebhook, setSlackWebhook] = useState('');
    const [logsNumber, setLogsNumber] = useState(5);

    useEffect(() => {
        getAlertsConf();
        return () => {
        }
    }, [])


    const handleSlackWebhook = (e) => {
        setSlackWebhook(e.target.value);
    }

    const handleLogsNumber = (e, newValue) => {
        setLogsNumber(e.target.value);
    }

    const updateAlertsConfig = () => {
        const url = window.location.href;
        // const url = "https://lila.com.ar/firewatch"
        const splittedDomain = url.split("/");
        const domain = splittedDomain[0] + "//" + splittedDomain[2];
        console.log(domain);
        const endpoint = BASE_URL + "/api/docker-firewatch/alerts"
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
                logsTail: logsNumber.toString()
            }),
        }
        )
            .then(alert('Configuration saved succesfully'))
            .catch((err) => console.log(err));
    }


    const getAlertsConf = () => {
        axios.get(BASE_URL + "/api/docker-firewatch/alerts")
            .then(function (response) {
                console.log(response);
                setSlackWebhook(response.data.data.slackWebhook);
                let parsedLogsNumber = 
                setLogsNumber(parseInt(response.data.data.logsTail));
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <>
            <div className="container">
                <Paper elevation={10} className="card">
                    <TextField value={slackWebhook} defaultValue={"Slack webhook"} label="Slack webhook" variant="standard" onChange={handleSlackWebhook}></TextField>
                    <div className="">
                        <FormLabel>Logs quantity</FormLabel>
                        <div className="slider">
                            <Slider step={1} marks min={1} max={20} label="Logs number" value={logsNumber} onChange={handleLogsNumber} />
                            <p>{logsNumber}</p>
                        </div>
                    </div>
                    <Button className="saveButton" onClick={updateAlertsConfig}>Save configuration</Button>
                </Paper>
            </div>
        </>
    );
}

export default AlertsConfig;