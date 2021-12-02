
import { useCallback, useState } from "react";
import { Grid, Typography, CircularProgress, IconButton, Box } from "@mui/material";
import { Artwork } from './Artwork';
import { useGetCollectionQuery, usePrefetch } from '../../services/api';
import { ArrowDownward } from "@mui/icons-material";
import { Artwork as ArtworkType } from "../../app/types";
import { useAppSelector } from "../../app/hooks";
import { Redirect } from "react-router-dom";

export function Collection() {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const totalPages = 1200;
  const limit = 50;
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const { data, isError, isFetching, isLoading, isSuccess } = useGetCollectionQuery(offset);
  const prefetchOffset = usePrefetch('getCollection');
  const [collection, setCollection] = useState<ArtworkType[] | undefined>(data || []);

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setOffset((page) * limit);
      if (data && collection) {
        setCollection([...collection, ...data]);
      }
    }

  }
  const prefetchNext = useCallback(() => {
    prefetchOffset(offset)
  }, [prefetchOffset, offset])

  if (!isLoggedIn) {
    return <Redirect to='/login' />;
  }
  if (isLoading || isFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>);
  }
  if (!data?.length || isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        An error occurred.
      </Box>);
  }
  console.log(collection?.length, data.length);
  return (
    <Box>
      <Typography sx={{ p: 2 }}>
        Carnegie Museum of Art is arguably the first museum of contemporary art in the United States, collecting the “Old Masters of tomorrow” since the inception of the Carnegie International in 1896.
        Our collection of more than 34,000 objects features a broad spectrum of visual art, including painting and sculpture; prints and drawings; photographs; architectural casts, renderings, and models; decorative arts and design; and film, video, and digital imagery. The museum also houses the archive of over 70,000 negatives by photographer Charles “Teenie” Harris.
      </Typography>
      <Grid container spacing={1} sx={{ display: 'flex', alignContent: 'center', flexDirection: "column" }}>
        {collection?.map((artwork, index) => {
          return (
            <Grid key={`${index}_${artwork.title}`} item xs={11} >
              <Artwork artwork={artwork} />
            </Grid>
          )
        })}
        <Grid item sx={{ display: 'flex', alignSelf: 'center' }}>
          <IconButton onClick={loadMore} onMouseEnter={prefetchNext}>
            <ArrowDownward />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  )
}