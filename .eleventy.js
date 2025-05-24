module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("blog/images");

  // A collection for content pages
  eleventyConfig.addCollection("pages", function(collectionApi) {
    return collectionApi.getAll().filter(item =>
      "title" in item.data &&
      "description" in item.data &&
      "image" in item.data &&
      !item.data.excludeFromIndex  // optional: skip pages you don’t want
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