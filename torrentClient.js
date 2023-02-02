const WebTorrent = require('webtorrent');

const printProcess = (torrentInfo, progressBarLength = 25) => {
  const percent = torrentInfo.progress * 100 | 0;
  const speed = torrentInfo.downloadSpeed / 1024 / 1024 | 0;
  const downloadedSize = torrentInfo.downloaded / 1024 / 1024 | 0;
  const fullSize = torrentInfo.length / 1024 / 1024 | 0;

  const percentPerDot = 100 / progressBarLength | 0;
  const doneCount = percent / percentPerDot | 0;
  const done = '\033[42m' + ' '.repeat(doneCount) + '\033[0m';
  const undone = ' '.repeat(progressBarLength - doneCount);

  process.stdout.write(`\r[${done}${undone}] ${percent}% (${downloadedSize}/${fullSize} MB) speed: ${speed} MB/S`);
};

const magnetURI = '';
new WebTorrent().add(magnetURI, {path: 'downloads'}, torrentInfo => {
  console.info(`\nDownload file: ${torrentInfo.name}\n`);
  torrentInfo.on('download', () => printProcess(torrentInfo));
  torrentInfo.on('done', () => setTimeout(() => {
    console.info('\n\n\033[32mDOWNLOAD COMPLETE!\033[0m');
    process.exit(0);
  }, 5000));
});
