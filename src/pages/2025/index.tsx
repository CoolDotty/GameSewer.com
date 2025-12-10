import { archiveDomain, getArchivedPhotos } from '../../utils/get-photos';

import React from 'react';
import { MasonryPhotoAlbum } from 'react-photo-album';
import InfiniteScroll from 'react-photo-album/scroll';
import 'react-photo-album/rows.css';
import { Photo } from '../../utils/get-photos';
import { useWindowWidth } from '../../utils/hooks';

// https://codepen.io/stefen/pen/NgyoxY
import Lottie from 'lottie-react';
import sludge from '../../lotties/sludge.json';

import styles from './styles.module.css';
import Head from 'next/head';

export const getStaticProps = async () => {
  const photos = await getArchivedPhotos('CoolDotty', 'game-sewer-photo-archive');
  const thisYearPhotos = photos.filter((photo) =>
    photo.original.startsWith(archiveDomain + '2025')
  );
  return {
    props: { photos: thisYearPhotos },
  };
};

interface Events2025Props {
  photos?: Photo[];
}

const Events2025: React.FC<Events2025Props> = (props) => {
  const photos = props.photos || [];

  const windowWidth = useWindowWidth();
  let photos_per_row = 4;
  if (windowWidth < 640) {
    photos_per_row = 2; // phone
  } else if (windowWidth < 1024) {
    photos_per_row = 3; // tablet
  } // else desktop (7)

  const albumPhotos = photos
    .filter((photo) => photo.original.indexOf('poster.jpg') === -1)
    .map((photo) => ({
      src: photo.preview || '',
      width: 256,
      height: (256 / 4) * 3,
    }));

  const fetchPhotos = async (index: number) => {
    const sliced = albumPhotos.slice(index * photos_per_row, (index + 1) * photos_per_row);
    if (sliced.length === 0) return null;
    return sliced;
  };

  const initialPhotos = albumPhotos.slice(0, photos_per_row);

  const onPhotoClick = ({ index }: { index: number }) => {
    window.open(photos[index].original, '_blank');
  };

  return (
    <>
      <Head>
        <title>GameSewer/Vancouver</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <Lottie className={styles.sludge} animationData={sludge} loop={true} autoplay={true} />
          <img className={styles.headerTitle} src="/splash2025.webp" alt="GameSewer Logo" />
          <div className={styles.social}>
            <a
              className={styles.socialLink}
              href="https://twitter.com/vangamesewer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              {/* Twitter SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="bi bi-twitter"
                viewBox="0 0 16 16"
                id="Twitter--Streamline-Bootstrap"
                height="24"
                width="24"
              >
                <path
                  d="M5.026 15c6.038 0 9.341 -5.003 9.341 -9.334q0.002 -0.211 -0.006 -0.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1 -1.889 0.518 3.3 3.3 0 0 0 1.447 -1.817 6.5 6.5 0 0 1 -2.087 0.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1 -6.767 -3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 0.64 6.575v0.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1 -0.865 0.115 3 3 0 0 1 -0.614 -0.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 0.78 13.58a6 6 0 0 1 -0.78 -0.045A9.34 9.34 0 0 0 5.026 15"
                  stroke-width="1"
                ></path>
              </svg>
            </a>
            <a
              className={styles.socialLink}
              href="https://bsky.app/profile/gamesewer.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bluesky"
            >
              {/* Bluesky SVG (simple bird-like icon) */}
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                id="Bluesky--Streamline-Simple-Icons"
                height="24"
                width="24"
              >
                <path
                  d="M12 10.8c-1.087 -2.114 -4.046 -6.053 -6.798 -7.995C2.566 0.944 1.561 1.266 0.902 1.565 0.139 1.908 0 3.08 0 3.768c0 0.69 0.378 5.65 0.624 6.479 0.815 2.736 3.713 3.66 6.383 3.364 0.136 -0.02 0.275 -0.039 0.415 -0.056 -0.138 0.022 -0.276 0.04 -0.415 0.056 -3.912 0.58 -7.387 2.005 -2.83 7.078 5.013 5.19 6.87 -1.113 7.823 -4.308 0.953 3.195 2.05 9.271 7.733 4.308 4.267 -4.308 1.172 -6.498 -2.74 -7.078a8.741 8.741 0 0 1 -0.415 -0.056c0.14 0.017 0.279 0.036 0.415 0.056 2.67 0.297 5.568 -0.628 6.383 -3.364 0.246 -0.828 0.624 -5.79 0.624 -6.478 0 -0.69 -0.139 -1.861 -0.902 -2.206 -0.659 -0.298 -1.664 -0.62 -4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"
                  stroke-width="1"
                ></path>
              </svg>
            </a>
            <button
              className={styles.socialLink}
              onClick={() => {
                if (typeof window === 'undefined') return;
                const url = atob('aHR0cHM6Ly9kaXNjb3JkLmdnL3V1dkFYQlFaVzY=');
                const a = document.createElement('a');
                a.href = url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                document.body.appendChild(a);
                a.click();
                a.remove();
              }}
              aria-label="Discord"
            >
              {/* Discord SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="bi bi-discord"
                viewBox="0 0 16 16"
                id="Discord--Streamline-Bootstrap"
                height="24"
                width="24"
              >
                <path
                  d="M13.545 2.907a13.2 13.2 0 0 0 -3.257 -1.011 0.05 0.05 0 0 0 -0.052 0.025c-0.141 0.25 -0.297 0.577 -0.406 0.833a12.2 12.2 0 0 0 -3.658 0 8 8 0 0 0 -0.412 -0.833 0.05 0.05 0 0 0 -0.052 -0.025c-1.125 0.194 -2.22 0.534 -3.257 1.011a0.04 0.04 0 0 0 -0.021 0.018C0.356 6.024 -0.213 9.047 0.066 12.032q0.003 0.022 0.021 0.037a13.3 13.3 0 0 0 3.995 2.02 0.05 0.05 0 0 0 0.056 -0.019q0.463 -0.63 0.818 -1.329a0.05 0.05 0 0 0 -0.01 -0.059l-0.018 -0.011a9 9 0 0 1 -1.248 -0.595 0.05 0.05 0 0 1 -0.02 -0.066l0.015 -0.019q0.127 -0.095 0.248 -0.195a0.05 0.05 0 0 1 0.051 -0.007c2.619 1.196 5.454 1.196 8.041 0a0.05 0.05 0 0 1 0.053 0.007q0.121 0.1 0.248 0.195a0.05 0.05 0 0 1 -0.004 0.085 8 8 0 0 1 -1.249 0.594 0.05 0.05 0 0 0 -0.03 0.03 0.05 0.05 0 0 0 0.003 0.041c0.24 0.465 0.515 0.909 0.817 1.329a0.05 0.05 0 0 0 0.056 0.019 13.2 13.2 0 0 0 4.001 -2.02 0.05 0.05 0 0 0 0.021 -0.037c0.334 -3.451 -0.559 -6.449 -2.366 -9.106a0.03 0.03 0 0 0 -0.02 -0.019m-8.198 7.307c-0.789 0 -1.438 -0.724 -1.438 -1.612s0.637 -1.613 1.438 -1.613c0.807 0 1.45 0.73 1.438 1.613 0 0.888 -0.637 1.612 -1.438 1.612m5.316 0c-0.788 0 -1.438 -0.724 -1.438 -1.612s0.637 -1.613 1.438 -1.613c0.807 0 1.451 0.73 1.438 1.613 0 0.888 -0.631 1.612 -1.438 1.612"
                  stroke-width="1"
                ></path>
              </svg>
            </button>
          </div>
        </header>
        <main className={styles.main}>
          <p className={styles.zing}>
            Some of the games ever made by really really indie developers
          </p>
          <h2 className={styles.h2}>Photos</h2>
        </main>
        <div className={styles.submain}>
          <InfiniteScroll
            key={photos_per_row}
            photos={initialPhotos}
            fetch={fetchPhotos}
            onClick={onPhotoClick}
          >
            <MasonryPhotoAlbum photos={[]} columns={photos_per_row} padding={8} />
          </InfiniteScroll>
        </div>
        <footer className={styles.footer}>todo</footer>
      </div>
    </>
  );
};

export default Events2025;
