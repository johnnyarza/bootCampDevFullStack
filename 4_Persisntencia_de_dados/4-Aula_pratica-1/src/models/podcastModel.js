export default (mongoose) => {
  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      required: true,
      type: String,
    },
    category: {
      required: true,
      type: String,
    },
    source: {
      required: true,
      type: String,
    },
    itunes: String,
    rss: String,
    soundcloud: String,
  });

  const Podcast = mongoose.model('podcast', schema, 'podcast');
  return Podcast;
};
