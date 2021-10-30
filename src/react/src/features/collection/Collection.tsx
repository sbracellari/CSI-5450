
import { useAppSelector } from '../../app/hooks';
import { Grid } from "@mui/material";
import { Artwork } from './Artwork';

export function Collection() {
  const collection = useAppSelector((state) => state.collection.collection);

  return (
    <Grid container spacing={2} justifyContent="center" >
      {collection.map((artwork, index) => {
        return (
          <Grid item xs={11}>
            <Artwork artwork={artwork}/>
          </Grid>
        )
      })}
    </Grid>
  )
}