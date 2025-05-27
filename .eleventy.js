module.exports = function(eleventyConfig) {
  // Static files passthrough
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("blog/images");
  eleventyConfig.addPassthroughCopy("games/sumfing/assets");
  
  // Collection: pages
  eleventyConfig.addCollection("pages", function(collectionApi) {
    return collectionApi.getAll().filter(item =>
      "title" in item.data &&
      "description" in item.data &&
      "image" in item.data &&
      !item.data.excludeFromIndex
    )
    .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
