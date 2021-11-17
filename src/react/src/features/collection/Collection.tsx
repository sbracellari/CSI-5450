
import { Grid, Typography, CircularProgress } from "@mui/material";
import { Artwork } from './Artwork';
import { getCollection } from '../../services/api';
import { data as collectionData } from '../../services/collectionApi';

export function Collection() {
  const { data: collection, isError, isLoading, isFetching } = getCollection();
  //temp data

  //const { data: collection, isError, isLoading, isFetching } = { data: collectionData, isLoading: false, isError: false, isFetching: false }

  let component;


  if (isFetching || isLoading) {
    component = <CircularProgress />;
  } else if (!collection || isError) {
    component = <Typography>An error occured</Typography>;
  } else {
    //@todo: fix centering of the artworks
    component = (
      collection.map((artwork, index) => {
        return (
          <Grid key={`${index}_${artwork.title}`} item xs={11} >
            <Artwork artwork={artwork} />
          </Grid>
        )
      }));
  }

  return (
    <Grid container spacing={1} justifyContent="center" >
      <Typography sx={{ p: 2 }}>
        Carnegie Museum of Art is arguably the first museum of contemporary art in the United States, collecting the “Old Masters of tomorrow” since the inception of the Carnegie International in 1896.
        Our collection of more than 34,000 objects features a broad spectrum of visual art, including painting and sculpture; prints and drawings; photographs; architectural casts, renderings, and models; decorative arts and design; and film, video, and digital imagery. The museum also houses the archive of over 70,000 negatives by photographer Charles “Teenie” Harris.
      </Typography>
      {component}
    </Grid>
  )
}