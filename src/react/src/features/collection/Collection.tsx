
import { useAppSelector } from '../../app/hooks';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

export function Collection() {
  const collection = useAppSelector((state) => state.collection.collection);

  return (
    <Grid container spacing={2} justifyContent="center" >
      {collection.map((artwork, index) => {
        return (
          <Grid item xs={11}>
            <Card key={index} variant="outlined" sx={{ pb: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 200 }}
                image="../../../public/logo512.png"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent >
                  <Typography component="div" variant="h6">
                    {artwork.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {artwork.creator.fullName} - {artwork.creationDate}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, gap: 2 }}>
                  <Chip color="info" label={artwork.medium} />
                  <Chip color="secondary" label={artwork.classification} />
                </Box>
              </Box>
              <CardActions>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <Button size="small" aria-label="view details" component={Link} to={`/details?id=${artwork.id}`}>Details</Button>
                <Button size="small" aria-label="add to tour" >Add to tour</Button>
              </CardActions>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}