import ContainersConfig from "../containersConfig/containersConfig";
import { Box } from "@mui/system";
import { Tab } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import './mainPage.css'
import { useState } from "react";

function MainPage() {

    const pages = ['Containers', 'Alerts', 'System usage', 'Sites health']
    const [currPage, setCurrPage] = useState(1);

    const handleSelect = (e, newValue) => {
        setCurrPage(newValue);
    }

    return (
        <div>
            <div className="appBar">
                <img className="fireImg" src="fire.gif"></img>
                    <p className="title">
                        Firewatch
                    </p>
            </div>
            <Box className='navBar'>
                <Tabs onChange={handleSelect} value={currPage} indicatorColor='secondary'>
                    {pages.map((page, i) => (
                        <Tab label={page} value={i} key={i} />
                    ))}
                </Tabs>
            </Box>
            {pages[currPage] == 'Containers' && <Box>
                <ContainersConfig />
            </Box>}
            {pages[currPage] == 'Alerts' && <Box>
                <ContainersConfig />
            </Box>}
        </div>
    );
}

export default MainPage;