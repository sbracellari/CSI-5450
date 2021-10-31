
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Box, Button, Grid, Typography } from "@mui/material";
import { Artwork } from './Artwork';
import { getCollection } from './collectionSlice';

export function Collection() {
  const { collection, status } = useAppSelector((state) => state.collection);
  const dispatch = useAppDispatch();

  return (
    <Grid container spacing={1} justifyContent="center" >
      <Grid item xs={12}>
        <Typography sx={{ p: 2 }}>
          Carnegie Museum of Art is arguably the first museum of contemporary art in the United States, collecting the “Old Masters of tomorrow” since the inception of the Carnegie International in 1896.
          Our collection of more than 34,000 objects features a broad spectrum of visual art, including painting and sculpture; prints and drawings; photographs; architectural casts, renderings, and models; decorative arts and design; and film, video, and digital imagery. The museum also houses the archive of over 70,000 negatives by photographer Charles “Teenie” Harris.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
          <Button onClick={() => dispatch(getCollection())} variant="contained">View collection</Button>
        </Box>
      </Grid>
      {collection.map((artwork, index) => {
        return (
          <Grid key={`${index}_${artwork.title}`} item xs={11}>
            <Artwork artwork={artwork} />
          </Grid>
        )
      })}
    </Grid>
  )
}