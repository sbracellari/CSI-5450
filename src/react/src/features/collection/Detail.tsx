import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
export function Detail() {
    const { detail: artwork } = useAppSelector(state => state.detail);
    return (
        <Card variant="outlined" sx={{ pb: 2 }}>
            <CardMedia
                component="img"
                sx={{ width: 200 }}
                image="../../../public/logo512.png"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent >
                    <Typography component="div" variant="h6">
                        {artwork?.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {artwork?.creator.fullName} - {artwork?.creationDate}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
};
