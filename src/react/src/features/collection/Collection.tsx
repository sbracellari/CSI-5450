
import { Grid, Typography, CircularProgress } from "@mui/material";
import { Artwork } from './Artwork';
import { getCollection } from '../../services/api';
import { data as collectionData } from '../../services/collectionApi';
import { useAppSelector } from "../../app/hooks";
import { Redirect } from "react-router-dom";

export function Collection(props: { tours: any }) {
  //const { data: collection, isError, isLoading, isFetching } = getCollection();
  //temp data
  const { tours } = props;

  const { isLoggedIn } = useAppSelector(state => state.auth);
  const { data: collection, isError, isLoading, isFetching } = { data: collectionData, isLoading: false, isError: false, isFetching: false }

  let component;

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  } else if (isFetching || isLoading) {
    component = <CircularProgress />;
  } else if (isError) {
    component = <Typography>An error occured</Typography>;
  } else {
    //@todo: fix centering of the artworks
    component = (
      collection.map((artwork, index) => {
        return (
          <Grid key={`${index}_${artwork.title}`} item xs={11} >
            <Artwork tours={tours.data} artwork={artwork} />
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