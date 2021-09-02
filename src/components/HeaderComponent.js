import React from 'react'
import { Box, Typography } from '@material-ui/core'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';

const Header = (props) => {
    
    const { text } = props;

    return (
        <Box display='flex' alignItems='center' pt={10} pl={10}>
            <SettingsEthernetIcon fontSize='large' color='secondary'/>
            <Typography variant='h5' color='secondary' style={{marginLeft: '10px', fontWeight:600}}>
                {text}
            </Typography>
        </Box>
    )
}

export default Header
