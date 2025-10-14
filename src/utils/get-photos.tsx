const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.warn('.env.GITHUB_TOKEN is not set. GitHub API requests may be rate-limited.');
}

type Tree = TreeItem[];

type TreeItem = {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size: number;
  url: string;
};

export type Photo = {
  original: string;
  preview?: string;
};

export const archiveDomain = 'https://photos.gamesewer.com/';

export async function getArchivedPhotos(
  owner: string,
  repo: string,
  branch = 'main'
): Promise<Photo[]> {
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };

  // Step 1: Get the branch info to retrieve the tree SHA
  const branchRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/branches/${branch}`,
    { headers }
  );
  if (!branchRes.ok) throw new Error('Failed to fetch branch info');
  const branchData = await branchRes.json();
  const treeSha = branchData.commit.commit.tree.sha;

  // Step 2: Get the full recursive tree
  const treeRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`,
    { headers }
  );
  if (!treeRes.ok) throw new Error('Failed to fetch repo tree');
  const tree: Tree = (await treeRes.json()).tree;

  const imageRegex = /\.(png|jpg|webp)$/i;
  const allPhotos = tree.filter(({ type, path }) => type === 'blob' && imageRegex.test(path));
  const archivedPhotosMap = allPhotos.reduce((acc: any, photo) => {
    const photoKey: string = photo.path.split('.')[0];
    if (!acc[photoKey]) {
      acc[photoKey] = { original: null, preview: null };
    }
    if (photo.path.endsWith('.webp')) {
      acc[photoKey].preview = archiveDomain + photo.path;
    } else {
      acc[photoKey].original = archiveDomain + photo.path;
    }
    return acc;
  }, {});
  const archivedPhotosList: Photo[] = Object.values(archivedPhotosMap);

  return archivedPhotosList;
}
