import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette:{
        primary:{
            main:'#400037',
            light:'#590037'
        },
        secondary: {
            main: '#fff',
        },
        action:{
            hover:'#FBF2FF'
        }
    },
    typography:{
        fontFamily:[
            'Poppins'
        ]
    }
})

export default theme;