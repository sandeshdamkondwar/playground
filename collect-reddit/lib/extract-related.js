const REDDIT_LOOKUP = /\.com\/r\/([a-zA-Z0-9_.:\-]+)/g;

module.exports = extractRelated;

function extractRelated(subredit) {
  let display_name = subredit.display_name;
  let description = subredit.description;

  let matches = description && description.match(REDDIT_LOOKUP);
  let related;
  if (matches) {
    let uniqueSubset = new Set(matches.map(x => {
      let id = x.toLowerCase().substr(7)
      return id.replace(/[:.]+$/g, ''); // trim 
    })); // we remove preceding .com/r/ - 7 chars
    // make sure we do not record this very subreddit:
    uniqueSubset.delete(subredit);

    related = Array.from(uniqueSubset);
  }

  if (!related) related = [];

  return {
    display_name,
    related
  }
}
