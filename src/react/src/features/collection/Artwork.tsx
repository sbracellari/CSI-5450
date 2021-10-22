import { Card, CardContent, Typography } from "@mui/material";
import { Artwork as ArtworkType } from "./collectionSlice";

const  Artwork = (artwork: ArtworkType) => {
    return(
        <div>
        <Card>
            <CardContent>
                <Typography>
                    {artwork.title}
                </Typography>
            </CardContent>
        </Card>
        </div>
    )
};
export default Artwork;