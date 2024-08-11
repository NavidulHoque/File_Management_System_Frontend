export default function sortFilesAndFolders(items) {
    return items.sort((item1, item2) => {

            const regex = /(\d+)/g;
            const item1Parts = item1.name.split(regex).map((part) => (isNaN(part) ? part : parseInt(part, 10)));
            const item2Parts = item2.name.split(regex).map((part) => (isNaN(part) ? part : parseInt(part, 10)));
          
            for (let i = 0; i < Math.min(item1Parts.length, item2Parts.length); i++) {
              if (item1Parts[i] < item2Parts[i]) return -1;
              if (item1Parts[i] > item2Parts[i]) return 1;
            }
    })
}