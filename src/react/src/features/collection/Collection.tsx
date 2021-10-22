
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";

export function Collection(){
    const collection = useAppSelector((state) => state.collection.collection);
    
return(
    <div>
        {collection.map((artwork,index) => {
           return( 
            <Card key={index} sx={{ display: 'flex' }} variant="outlined" style={{paddingBottom: 2}}>
                <CardMedia
                  component="img"
                  sx={{ width: 200 }}
                  image="../../../public/logo512.png"
                />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h6">
                    {artwork.title} 
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {artwork.creator.fullName} - {artwork.creationDate}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Meduim: {artwork.medium}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Classification: {artwork.classification}
                </Typography>
              </Box>
            </Box>
          </Card>
                )})}
    </div>
    )
}