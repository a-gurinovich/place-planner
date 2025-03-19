import styled from '@emotion/styled';
import { Box, Hidden } from '@mui/material';


const ScrollingWrapper = styled(Box)(({ overflowX = 'scroll', overflowY = 'scroll' }) => ({
    overflowX,
    overflowY,
    whiteSpace: 'nowrap',
}));

export default ScrollingWrapper;