import db from '../models/index.js';

const Podcast = db.podcast;

const create = async (req, res) => {
  const {
    name,
    description,
    category,
    source,
    rss,
    itunes,
    soundcloud,
  } = req.body;

  const podcast = new Podcast({
    name,
    description,
    category,
    source,
    rss,
    itunes,
    soundcloud,
  });

  try {
    const data = await Podcast.create(podcast);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Podcast.find();
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const findOne = async (req, res) => {
  const _id = req.params.id;
  try {
    const data = await Podcast.findOne({ _id });
    res.send(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar');
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  try {
    const data = Podcast.findByIdAndUpdate(id, req.body);
    res.send(data);
  } catch (error) {
    res.status(500).send('Erro ao atualizar');
  }
};

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    await Podcast.findByIdAndDelete(id);
    res.send('Excluído');
  } catch (error) {
    res.status(500).send('Erro ao excluir');
  }
};

export default { create, findAll, findOne, update, remove };
