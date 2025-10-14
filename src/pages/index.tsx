import React, { useMemo } from 'react';
import Head from 'next/head';
import { archiveDomain, getArchivedPhotos, Photo } from '../utils/get-photos';
import { MasonryPhotoAlbum, RowsPhotoAlbum } from 'react-photo-album';
import InfiniteScroll from 'react-photo-album/scroll';
import 'react-photo-album/rows.css';

export const getStaticProps = async () => {
  const photos = await getArchivedPhotos('CoolDotty', 'game-sewer-photo-archive');
  const thisYearPhotos: Photo[] = photos.filter((photo) =>
    photo.original.startsWith(archiveDomain + '2025')
  );
  return {
    props: { photos: thisYearPhotos },
  };
};

interface HomeProps {
  photos: Photo[];
}

const PHOTOS_PER_PAGE = 7;

const Home: React.FC<HomeProps> = (props) => {
  const { photos } = props;

  const albumPhotos = useMemo(
    () =>
      (photos || []).map((photo) => ({
        src: photo.preview || '',
        width: 256,
        height: (256 / 4) * 3,
      })),
    [photos]
  );

  const fetchPhotos = async (index: number) => {
    const sliced = albumPhotos.slice(index * PHOTOS_PER_PAGE, (index + 1) * PHOTOS_PER_PAGE);
    if (sliced.length === 0) return null;
    return sliced;
  };

  const initialPhotos = albumPhotos.slice(0, PHOTOS_PER_PAGE);

  const onPhotoClick = ({ index }: { index: number }) => {
    window.open(photos[index].original, '_blank');
  };

  return (
    <>
      <Head>
        <title>GameSewer.com/Vancouver</title>
      </Head>
      <InfiniteScroll photos={initialPhotos} fetch={fetchPhotos} onClick={onPhotoClick}>
        <MasonryPhotoAlbum photos={[]} />
      </InfiniteScroll>
    </>
  );
};

export default Home;
